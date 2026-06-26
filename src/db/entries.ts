import { invalidateEnglishFuse } from '../engine/english';
import { invalidateFuzzy } from '../engine/fuzzy';
import type { DictionaryEntry } from '../models/Entry';
import { db } from './db';

const invalidateIndexes = (): void => {
  invalidateFuzzy();
  invalidateEnglishFuse();
};

const SOURCE_RANK: Record<string, number> = { seed: 0, user: 1, llm: 2, dict: 3 };

export const addEntry = async (entry: DictionaryEntry): Promise<number> => {
  const id = (await db.entries.add(entry)) as number;
  invalidateIndexes();
  return id;
};

export const addDictEntries = async (entries: DictionaryEntry[]): Promise<void> => {
  await db.entries.bulkAdd(entries);
  invalidateIndexes();
};

export const allEntries = (): Promise<DictionaryEntry[]> => db.entries.toArray();

export const clearDictEntries = async (): Promise<void> => {
  await db.entries.where('source').equals('dict').delete();
  invalidateIndexes();
};

export const commonEntries = (): Promise<DictionaryEntry[]> =>
  db.entries.where('source').equals('seed').toArray();

export const dictCount = (): Promise<number> => db.entries.where('source').equals('dict').count();

export const entriesByIds = async (ids: number[]): Promise<DictionaryEntry[]> => {
  const rows = await db.entries.bulkGet(ids);
  return rows.filter((row): row is DictionaryEntry => Boolean(row));
};

export const entriesCount = (): Promise<number> => db.entries.count();

// When several entries share a key (curated seed vs the big Wiktionary dictionary),
// prefer the hand-curated one: seed > user > llm > dict.
export const findByKey = async (key: string): Promise<DictionaryEntry | undefined> => {
  const matches = await db.entries.where('normalizedKey').equals(key).toArray();
  if (matches.length === 0) {
    const viaAlias = await db.entries.where('aliases').equals(key).toArray();
    matches.push(...viaAlias);
  }
  if (matches.length === 0) return undefined;
  return matches.sort((a, b) => (SOURCE_RANK[a.source] ?? 9) - (SOURCE_RANK[b.source] ?? 9))[0];
};
