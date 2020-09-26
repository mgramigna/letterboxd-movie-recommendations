import csv from 'csvtojson';
import { RatingCSVRow } from '../types/letterboxd';

export async function parseData(csvData: string, ratingRange: number[]): Promise<RatingCSVRow[]> {
  const lbData = (await csv().fromString(csvData)) as RatingCSVRow[];

  // Only consider films rated 4.5 or 5 stars
  const highestRatedData = lbData.filter(
    m => parseFloat(m.Rating) >= ratingRange[0] && parseFloat(m.Rating) <= ratingRange[1]
  );
  return highestRatedData;
}
