import { allEntries, findByKey } from '../db/entries';
import type { LookupResult } from '../models/Lookup';
import { fuzzyMatch, getFuse } from './fuzzy';
import { normalize } from './normalize';

/**
 * Deterministic, fully offline lookup pipeline: normalize -> exact (indexed)
 * -> fuzzy (Fuse.js). The optional on-device LLM stage is invoked separately
 * by the state layer so it stays lazy and opt-in.
 */
export const lookup = async (query: string): Promise<LookupResult> => {
  const normalizedKey = normalize(query);
  const base = { query, normalizedKey };

  if (!normalizedKey) {
    return { ...base, entry: null, stage: 'none', approximate: false };
  }

  const exact = await findByKey(normalizedKey);
  if (exact) {
    return { ...base, entry: exact, stage: 'exact', approximate: false };
  }

  const fuzzy = fuzzyMatch(getFuse(await allEntries()), normalizedKey);
  if (fuzzy) {
    return { ...base, entry: fuzzy, stage: 'fuzzy', approximate: true };
  }

  return { ...base, entry: null, stage: 'none', approximate: false };
};
