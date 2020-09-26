import axios, { AxiosInstance } from 'axios';
import _ from 'lodash';
import { SearchResult, Movie, APIResult } from '../types/tmdb';
import { apiKey } from '../config/config.json';
import { RatingCSVRow } from '../types/letterboxd';

export default class TMBD {
  httpClient: AxiosInstance;
  lbData: RatingCSVRow[];

  constructor(lbData: RatingCSVRow[]) {
    this.lbData = lbData;
    this.httpClient = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
  }

  async getTMBDMovies(): Promise<Movie[]> {
    // Search TMDB for corresponding movie from Letterboxd data
    const searchResults = (await Promise.all(
      this.lbData.map(async movie => {
        const res = await this.httpClient.get(`/search/movie?query=${encodeURIComponent(movie.Name)}`);
        return res.data;
      })
    )) as SearchResult[];

    // First search result is most popular
    // TODO: Add some type of filter that guarantees movies match
    return searchResults.filter(r => r.total_results > 0).map(r => r.results[0]);
  }

  async getRecommendations(): Promise<APIResult> {
    const ratedMovies = await this.getTMBDMovies();

    // Get recommendations for each highly-rated movie
    const recommendations = await Promise.all(
      ratedMovies.map(async movie => {
        const res = await this.httpClient.get(`/movie/${movie.id}/recommendations`);
        const recs = res.data as SearchResult;
        return {
          movie,
          recommendations: recs.results.slice(0, 5)
        };
      })
    );

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
