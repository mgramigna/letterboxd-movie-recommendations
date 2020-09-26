import csv from 'csvtojson';
import { RatingCSVRow } from '../types/letterboxd';

/**
 * Convert CSV ratings to JSON format
 *
 * @param csvData {string} CSV-formatted Letterboxd ratings
 *
 * @returns {Promise<RatingCSVRow[]>} JSON representation of CSV ratings
 */
export async function parseData(csvData: string): Promise<RatingCSVRow[]> {
  return (await csv().fromString(csvData)) as RatingCSVRow[];
}
