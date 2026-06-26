import { findByKey } from '../db/entries';
import type { DictionaryEntry } from '../models/Entry';

// Object/possessive clitics that attach to a colloquial verb form (shod-ESH,
// did-AM-esh). Stripped before reaching for the past stem.
const CLITICS = [
  'eshun',
  'emun',
  'etun',
  'eshan',
  'eman',
  'etan',
  'esh',
  'ash',
  'mun',
  'tun',
  'shun',
  'am',
  'at',
  'et',
];

// Personal endings and the past-participle marker that sit on the past stem
// (raft-AM, did-I, shod-E).
const ENDINGS = ['and', 'am', 'im', 'id', 'in', 'an', 'ad', 'i', 'e'];

const SUFFIXES = ['an', 'dan', 'tan'];

// Persian past stems form their infinitive regularly as stem + "an"
// (shod → shodan, raft → raftan, gereft → gereftan). So reconstruct candidate
// infinitives by peeling clitics/endings off a typed colloquial form and
// re-adding the infinitive suffix, most-likely candidates first.
const candidateInfinitives = (key: string): string[] => {
  const ordered: string[] = [];
  const add = (candidate: string): void => {
    if (candidate.length >= 3 && candidate !== key && !ordered.includes(candidate)) {
      ordered.push(candidate);
    }
  };

  const bases = [key];
  for (const clitic of CLITICS) {
    if (key.endsWith(clitic) && key.length - clitic.length >= 3) {
      bases.push(key.slice(0, -clitic.length));
    }
  }

  // Strip an ending to reach the past stem, then rebuild the infinitive.
  for (const base of bases) {
    const stems: string[] = [];
    if (base.endsWith('e')) stems.push(base.slice(0, -1));
    for (const ending of ENDINGS) {
      if (base.endsWith(ending) && base.length - ending.length >= 2) {
        stems.push(base.slice(0, -ending.length));
      }
    }
    for (const stem of stems) for (const suffix of SUFFIXES) add(stem + suffix);
  }

  // Last resort: treat the base itself as a bare past stem (shod → shodan).
  for (const base of bases) for (const suffix of SUFFIXES) add(base + suffix);

  return ordered;
};

/**
 * Reduce an inflected/colloquial verb form to its dictionary infinitive, e.g.
 * `shode`/`shodam`/`shodesh` → `shodan`. Only a candidate that resolves to a
 * **verb** is accepted, so noun homographs (e.g. `goftemân` "discourse") can
 * never hijack a conjugation. Returns null for anything that isn't a single
 * token reducible to a known infinitive.
 */
export const deriveLemma = async (key: string): Promise<DictionaryEntry | null> => {
  if (!key || key.includes(' ')) return null;
  for (const candidate of candidateInfinitives(key)) {
    const entry = await findByKey(candidate);
    if (entry?.tags.includes('verb')) return entry;
  }
  return null;
};
