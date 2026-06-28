import { allEntries, findByKey } from '../db/entries';
import { deriveLemma } from './derive';
import { englishFuzzyMatch, findAllByMeaning, normalizeEnglish } from './english';
import type { LookupResult, SearchMode } from '../models/Lookup';
import { fuzzyMatch, getFuse } from './fuzzy';
import { normalize } from './normalize';

// How many additional Persian words to offer for a one-to-many English query.
const ALTERNATE_LIMIT = 12;

/**
 * Deterministic, fully offline lookup pipeline: normalize -> exact (indexed)
 * -> derive (inflected verb forms -> infinitive) -> fuzzy (Fuse.js). In English
 * mode the same stages run against entry meanings instead of Finglish keys,
 * resolving to the very same entry the Finglish term would. The optional
 * on-device LLM stage is invoked separately by the state layer so it stays lazy
 * and opt-in.
 */
export const lookup = async (
  query: string,
  mode: SearchMode = 'finglish',
): Promise<LookupResult> => {
  if (mode === 'english') return lookupEnglish(query);

  const normalizedKey = normalize(query);
  const base = { query, normalizedKey };

  if (!normalizedKey) {
    return { ...base, entry: null, stage: 'none', approximate: false };
  }

  const exact = await findByKey(normalizedKey);
  if (exact) {
    return { ...base, entry: exact, stage: 'exact', approximate: false };
  }

  // Colloquial/conjugated verb forms (shode, raftam) aren't dictionary lemmas;
  // reduce them to their infinitive before falling back to loose fuzzy matching.
  const derived = await deriveLemma(normalizedKey);
  if (derived) {
    return { ...base, entry: derived, stage: 'derived', approximate: true };
  }

  const fuzzy = fuzzyMatch(getFuse(await allEntries()), normalizedKey);
  if (fuzzy) {
    return { ...base, entry: fuzzy, stage: 'fuzzy', approximate: true };
  }

  return { ...base, entry: null, stage: 'none', approximate: false };
};

// When resolved, report the entry's Finglish key so a search records and dedupes
// against the equivalent Finglish lookup; otherwise fall back to the English key.
const lookupEnglish = async (query: string): Promise<LookupResult> => {
  const key = normalizeEnglish(query);
  const base = { query, normalizedKey: key };

  if (!key) {
    return { ...base, entry: null, stage: 'none', approximate: false };
  }

  const entries = await allEntries();

  // English is one-to-many; gather all matches ranked most-common-spoken first,
  // then present the best as the primary result and the rest as alternates.
  const matches = findAllByMeaning(entries, key, ALTERNATE_LIMIT + 1);
  if (matches.length > 0) {
    const [primary, ...rest] = matches;
    return {
      ...base,
      normalizedKey: primary.normalizedKey,
      entry: primary,
      stage: 'exact',
      approximate: false,
      alternates: rest,
    };
  }

  const fuzzy = englishFuzzyMatch(entries, key);
  if (fuzzy) {
    return {
      ...base,
      normalizedKey: fuzzy.normalizedKey,
      entry: fuzzy,
      stage: 'fuzzy',
      approximate: true,
    };
  }

  return { ...base, entry: null, stage: 'none', approximate: false };
};
