/**
 * Result of a search query from TMDB API
 */
export interface SearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
  rating?: string;
}

/**
 * Object for a movie from TMDB
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
  release_date: string;
  rating?: string;
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
