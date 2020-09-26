/**
 * JSON representation of a row in Letterboxd CSV
 */
export interface RatingCSVRow {
  Date: Date;
  Name: string;
  Year: number;
  'Letterboxd URI': string;
  Rating: string;
}
