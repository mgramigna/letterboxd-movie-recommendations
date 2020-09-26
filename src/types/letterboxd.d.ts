export interface LetterboxdData {
  common: Movie[];
  recommendations: Movie[];
}

export interface RatingCSVRow {
  Date: Date;
  Name: string;
  Year: number;
  'Letterboxd URI': string;
  Rating: string;
}
