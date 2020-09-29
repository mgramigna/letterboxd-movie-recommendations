import axios, { AxiosInstance } from 'axios';
import _ from 'lodash';
import { SearchResult, Movie, APIResult } from '../types/tmdb';
import { apiKey } from '../config/config.json';
import { RatingCSVRow } from '../types/letterboxd';

export default class TMBD {
  httpClient: AxiosInstance;
  lbData: RatingCSVRow[];
  watchedFilms: string[];

  constructor(lbData: RatingCSVRow[], ratingRange: number[]) {
    // List of watched film titles
    this.watchedFilms = lbData.map(r => r.Name);

    // Filter data in rating range
    this.lbData = lbData.filter(m => parseFloat(m.Rating) >= ratingRange[0] && parseFloat(m.Rating) <= ratingRange[1]);
    this.httpClient = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
  }

  async getTMBDMovies(): Promise<Movie[]> {
    // Search TMDB for corresponding movie from Letterboxd data
    return (
      await Promise.all(
        this.lbData.map(async movie => {
          const res = await this.httpClient.get(
            `/search/movie?query=${encodeURIComponent(movie.Name)}&year=${movie.Year}`
          );

          // Most matching search result given title and year
          // Not perfect but works most of the time
          const searchResults = res.data as SearchResult;
          if (!searchResults.results[0]) {
            return null;
          }
          return { ...searchResults.results[0], rating: movie.Rating };
        })
      )
    ).filter(e => !_.isNull(e)) as Movie[];
  }

  async getRecommendations(): Promise<APIResult> {
    const ratedMovies = await this.getTMBDMovies();

    // Get recommendations for each highly-rated movie
    const recommendations = await Promise.all(
      ratedMovies.map(async movie => {
        const res = await this.httpClient.get(`/movie/${movie.id}/recommendations`);
        const recs = res.data as SearchResult;

        const unwatchedRecs = recs.results.filter(f => !_.includes(this.watchedFilms, f.title));

        return {
          movie,
          recommendations: unwatchedRecs.slice(0, 5)
        };
      })
    );

    // Unique recommendations that have valid images
    const filteredRecs = _.uniqBy(recommendations, rec => rec.movie.id).filter(
      rec => rec.recommendations.length > 0 && !_.isNull(rec.movie.backdrop_path && !_.isNull(rec.movie.poster_path))
    );

    // 5 most common recommendations accross all movies
    const common = _(recommendations.map(r => r.recommendations))
      .flatten()
      .groupBy('id')
      .orderBy(f => f.length, 'desc')
      .flatten()
      .uniqBy((m: Movie) => m.id)
      .value()
      .slice(0, 5);

    // TODO: Filter out films that exist in watched
    return {
      common,
      recommendations: filteredRecs
    };
  }
}
