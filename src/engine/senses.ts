import { normFa } from './frequency';

/**
 * Hidden English match keywords mined from the OpenSubtitles parallel corpus
 * (see scripts/align-corpus.mjs), loaded from public/senses.json at startup.
 * They give an entry extra colloquial senses its Wiktionary gloss lacks
 * (e.g. موتور -> "motorcycle", "bike") so English lookup finds the right word —
 * **without changing any displayed definition**. Keyed by normFa(farsi).
 */
let senses: Map<string, string[]> | null = null;

export const setSenses = (data: Record<string, string[]>): void => {
  senses = new Map(Object.entries(data));
};

// Extra (non-displayed) English senses for an entry, matched by its Farsi form.
export const extraSenses = (farsi: string | undefined): string[] => {
  if (!farsi || !senses) return [];
  return senses.get(normFa(farsi)) ?? [];
};
