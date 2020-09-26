/**
 * Result of a search query from TMDB API
 */
export interface SearchResult {
  page: Number;
  total_results: Number;
  total_pages: Number;
  results: Movie[];
}

/**
 * Object for a movie from TMDB
 */
export interface Movie {
  id: string;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  genre_ids: Number[];
  original_language: string;
  original_title: string;
  popularity: Number;
  vote_average: Number;
  vote_count: Number;
  video: boolean;
  release_date: string;
}

/**
 * Resulting aggregated results from TMDB util
 */
export interface APIResult {
  recommendations: MovieRec[];
  common: Movie[];
}

/**
 * Each entry in the resulting recommendations
 */
interface MovieRec {
  movie: Movie;
  recommendations: Movie[];
}
