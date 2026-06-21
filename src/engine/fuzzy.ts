import Fuse, { type IFuseOptions } from 'fuse.js';
import type { DictionaryEntry } from '../models/Entry';

const fuseOptions: IFuseOptions<DictionaryEntry> = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.4,
  keys: [
    { name: 'normalizedKey', weight: 2 },
    { name: 'aliases', weight: 1.5 },
    { name: 'term', weight: 1 },
    { name: 'meaning', weight: 0.5 },
  ],
};

export const editDistance = (a: string, b: string): number => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
};

const tolerance = (length: number): number => (length <= 4 ? 1 : length <= 7 ? 2 : 3);

const closeEnough = (query: string, entry: DictionaryEntry): boolean => {
  const keys = [entry.normalizedKey, ...entry.aliases];
  const best = Math.min(...keys.map((key) => editDistance(query, key)));
  return best <= tolerance(query.length);
};

// The Fuse index over the whole dictionary (~15k entries) is expensive to build,
// so memoize it and only rebuild when the entry set changes.
let cache: { fuse: Fuse<DictionaryEntry>; size: number } | null = null;

export const invalidateFuzzy = (): void => {
  cache = null;
};

export const getFuse = (entries: DictionaryEntry[]): Fuse<DictionaryEntry> => {
  if (!cache || cache.size !== entries.length) {
    cache = { fuse: new Fuse(entries, fuseOptions), size: entries.length };
  }
  return cache.fuse;
};

export const fuzzyMatch = (fuse: Fuse<DictionaryEntry>, key: string): DictionaryEntry | null => {
  for (const { item } of fuse.search(key, { limit: 8 })) {
    if (closeEnough(key, item)) return item;
  }
  return null;
};
