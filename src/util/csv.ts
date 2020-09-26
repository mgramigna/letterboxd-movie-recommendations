import csv from 'csvtojson';
import { RatingCSVRow } from '../types/letterboxd';

/**
 * Convert CSV ratings to JSON format
 *
 * @param csvData {string} CSV-formatted Letterboxd ratings
 * @param ratingRange {number[]} inclusive range of user ratings to consider for receommendations
 *
 * @returns {Promise<RatingCSVRow[]>} JSON representation of CSV ratings
 */
export async function parseData(csvData: string, ratingRange: number[]): Promise<RatingCSVRow[]> {
  const lbData = (await csv().fromString(csvData)) as RatingCSVRow[];

  // Only consider films rated in provided range
  const highestRatedData = lbData.filter(
    m => parseFloat(m.Rating) >= ratingRange[0] && parseFloat(m.Rating) <= ratingRange[1]
  );

  return highestRatedData;
}
