import type { SearchRecord } from '../models/Search';
import { db } from './db';

export const clearSearches = (): Promise<void> => db.searches.clear();

export const recentSearches = async (limit = 100): Promise<SearchRecord[]> => {
  const rows = await db.searches.orderBy('at').reverse().toArray();
  const seen = new Set<string>();
  const unique: SearchRecord[] = [];
  for (const row of rows) {
    if (seen.has(row.normalizedKey)) continue;
    seen.add(row.normalizedKey);
    unique.push(row);
    if (unique.length >= limit) break;
  }
  return unique;
};

export const recordSearch = (record: SearchRecord): Promise<number> =>
  db.searches.add(record) as Promise<number>;
