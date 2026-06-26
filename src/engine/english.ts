import Fuse, { type IFuseOptions } from 'fuse.js';
import type { DictionaryEntry } from '../models/Entry';
import { editDistance } from './fuzzy';

const SOURCE_RANK: Record<string, number> = { seed: 0, user: 1, llm: 2, dict: 3 };

/**
 * English counterpart to `normalize`: lowercase, drop punctuation, collapse
 * whitespace. Used to compare a typed English query against entry meanings.
 */
export const normalizeEnglish = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

// A meaning is a "; "-joined list of glosses, and each gloss can itself be a
// "comma, list", so split on both to make every individual sense searchable:
// "jam; preserve; murabba" -> ["jam", "preserve", "murabba"].
const glossesOf = (meaning: string): string[] =>
  meaning.split(/[;,]/).map(normalizeEnglish).filter(Boolean);

// Lower is better: prefer the curated source, then the earlier (more prominent)
// sense within the entry, then the more precise (shorter) overall meaning.
const scoreOf = (entry: DictionaryEntry, glossIndex: number): number =>
  (SOURCE_RANK[entry.source] ?? 9) * 1e6 + glossIndex * 1e3 + Math.min(entry.meaning.length, 999);

interface EnglishIndex {
  exact: Map<string, DictionaryEntry>;
  fuse: Fuse<DictionaryEntry>;
  size: number;
}

const fuseOptions: IFuseOptions<DictionaryEntry> = {
  ignoreLocation: true,
  threshold: 0.3,
  keys: [
    { name: 'meaning', weight: 2 },
    { name: 'usages.english', weight: 1 },
  ],
};

// English-mode lookup needs its own index over English fields. Like the Finglish
// Fuse it is expensive to build over ~15k entries, so memoize and rebuild only
// when the entry set changes.
let cache: EnglishIndex | null = null;

export const invalidateEnglishFuse = (): void => {
  cache = null;
};

const buildIndex = (entries: DictionaryEntry[]): EnglishIndex => {
  // Reverse gloss -> entry map: for each individual English sense keep the
  // best-scoring entry, so "jam" resolves to morabbâ rather than a buried sense.
  const exact = new Map<string, DictionaryEntry>();
  const bestScore = new Map<string, number>();
  for (const entry of entries) {
    glossesOf(entry.meaning).forEach((gloss, index) => {
      const score = scoreOf(entry, index);
      if (score < (bestScore.get(gloss) ?? Infinity)) {
        bestScore.set(gloss, score);
        exact.set(gloss, entry);
      }
    });
  }
  return { exact, fuse: new Fuse(entries, fuseOptions), size: entries.length };
};

const getIndex = (entries: DictionaryEntry[]): EnglishIndex => {
  if (!cache || cache.size !== entries.length) cache = buildIndex(entries);
  return cache;
};

export const findByMeaning = (
  entries: DictionaryEntry[],
  key: string,
): DictionaryEntry | undefined => getIndex(entries).exact.get(key);

const tolerance = (length: number): number => (length <= 4 ? 1 : length <= 7 ? 2 : 3);

// Gate Fuse's loose substring hits with an edit-distance check against the
// entry's individual glosses, so e.g. "jam" can't resolve to "pyjamas".
const closeEnough = (query: string, entry: DictionaryEntry): boolean => {
  const glosses = glossesOf(entry.meaning);
  if (!glosses.length) return false;
  const best = Math.min(...glosses.map((gloss) => editDistance(query, gloss)));
  return best <= tolerance(query.length);
};

export const englishFuzzyMatch = (
  entries: DictionaryEntry[],
  key: string,
): DictionaryEntry | null => {
  for (const { item } of getIndex(entries).fuse.search(key, { limit: 8 })) {
    if (closeEnough(key, item)) return item;
  }
  return null;
};
