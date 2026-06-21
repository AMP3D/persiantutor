import type { DictionaryEntry } from '../models/Entry';
import { db } from './db';

export const addEntry = (entry: DictionaryEntry): Promise<number> =>
  db.entries.add(entry) as Promise<number>;

export const allEntries = (): Promise<DictionaryEntry[]> => db.entries.toArray();

export const commonEntries = (): Promise<DictionaryEntry[]> =>
  db.entries.where('source').equals('seed').toArray();

export const entriesCount = (): Promise<number> => db.entries.count();

export const findByKey = async (key: string): Promise<DictionaryEntry | undefined> => {
  const direct = await db.entries.where('normalizedKey').equals(key).first();
  return direct ?? db.entries.where('aliases').equals(key).first();
};
