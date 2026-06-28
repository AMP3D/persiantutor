import Fuse, { type IFuseOptions } from 'fuse.js';
import type { DictionaryEntry } from '../models/Entry';
import { editDistance } from './fuzzy';
import { freqRank } from './frequency';
import { extraSenses } from './senses';

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

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const cmp = (a: number, b: number): number => (a < b ? -1 : a > b ? 1 : 0);

// Match tiers (lower = better). Real-gloss matches always outrank hidden
// corpus-mined senses, so a spurious sense (قهوه "coffee" co-occurring with
// "cup") can never beat a real translation no matter how frequent the word is.
const GLOSS_EXACT = 0;
const GLOSS_CONTAINS = 1;
const SENSE_EXACT = 2;
const SENSE_CONTAINS = 3;

interface Match {
  entry: DictionaryEntry;
  matchType: number;
  glossIndex: number;
}

const matchInfo = (entry: DictionaryEntry, key: string, wordRe: RegExp): Match | null => {
  let matchType = Infinity;
  let glossIndex = 0;
  glossesOf(entry.meaning).forEach((gloss, index) => {
    const type = gloss === key ? GLOSS_EXACT : wordRe.test(gloss) ? GLOSS_CONTAINS : Infinity;
    if (type < matchType) {
      matchType = type;
      glossIndex = index;
    }
  });
  // Only fall back to hidden corpus-mined senses (never displayed) when the
  // gloss itself doesn't match — they fill in colloquial meanings for recall but
  // sit in a strictly lower tier than any real-gloss match.
  if (matchType > GLOSS_CONTAINS) {
    extraSenses(entry.farsi).forEach((sense, index) => {
      const type = sense === key ? SENSE_EXACT : wordRe.test(sense) ? SENSE_CONTAINS : Infinity;
      if (type < matchType) {
        matchType = type;
        glossIndex = index;
      }
    });
  }
  return matchType === Infinity ? null : { entry, matchType, glossIndex };
};

// When the same word has several entries (curated seed vs raw dictionary), keep
// the most authoritative / precise one. Lower is better.
const dedupeScore = (m: Match): number =>
  (SOURCE_RANK[m.entry.source] ?? 9) * 100 + m.matchType * 10 + m.glossIndex;

/**
 * English is one-to-many (many Persian words mean "cup"), so return every entry
 * whose meaning carries the query — as a standalone gloss ("cup") or a whole
 * word inside one ("a glass cup") — deduped by word. A standalone gloss is a
 * truer translation than an incidental mention, so exact-before-contained is the
 * primary order; within each tier the **most common spoken** word (frequency
 * list) comes first, so "cup" -> livân. This also stops a frequent homograph's
 * stray sense (ماه "moon" listing "beautiful person") from hijacking the top.
 */
export const findAllByMeaning = (
  entries: DictionaryEntry[],
  key: string,
  limit: number,
): DictionaryEntry[] => {
  const wordRe = new RegExp(`\\b${escapeRegExp(key)}\\b`);
  const best = new Map<string, Match>();
  for (const entry of entries) {
    const match = matchInfo(entry, key, wordRe);
    if (!match) continue;
    const prev = best.get(entry.normalizedKey);
    if (!prev || dedupeScore(match) < dedupeScore(prev)) best.set(entry.normalizedKey, match);
  }
  return [...best.values()]
    .sort(
      (a, b) =>
        cmp(a.matchType, b.matchType) ||
        cmp(freqRank(a.entry.farsi), freqRank(b.entry.farsi)) ||
        cmp(SOURCE_RANK[a.entry.source] ?? 9, SOURCE_RANK[b.entry.source] ?? 9) ||
        cmp(a.glossIndex, b.glossIndex) ||
        cmp(Math.min(a.entry.meaning.length, 999), Math.min(b.entry.meaning.length, 999)),
    )
    .slice(0, limit)
    .map((match) => match.entry);
};

const fuseOptions: IFuseOptions<DictionaryEntry> = {
  ignoreLocation: true,
  threshold: 0.3,
  keys: [
    { name: 'meaning', weight: 2 },
    { name: 'usages.english', weight: 1 },
  ],
};

// The English Fuse (typo fallback) is expensive to build over ~15k entries, so
// memoize it and rebuild only when the entry set changes.
let cache: { fuse: Fuse<DictionaryEntry>; size: number } | null = null;

export const invalidateEnglishFuse = (): void => {
  cache = null;
};

const getFuse = (entries: DictionaryEntry[]): Fuse<DictionaryEntry> => {
  if (!cache || cache.size !== entries.length) {
    cache = { fuse: new Fuse(entries, fuseOptions), size: entries.length };
  }
  return cache.fuse;
};

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
  for (const { item } of getFuse(entries).search(key, { limit: 8 })) {
    if (closeEnough(key, item)) return item;
  }
  return null;
};
