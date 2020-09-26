import csv from 'csvtojson';
import { RatingCSVRow } from '../types/letterboxd';

export async function parseData(csvData: string): Promise<RatingCSVRow[]> {
  const lbData = (await csv().fromString(csvData)) as RatingCSVRow[];

  // Only consider films rated 4.5 or 5 stars
  const highestRatedData = lbData.filter(m => parseFloat(m.Rating) >= 4.5);
  return highestRatedData;
}
