/**
 * Persian-script word-frequency ranking (spoken/conversational usage), loaded
 * from `public/frequency.json` at startup. A lower rank means more common. Used
 * to order one-to-many English-lookup results so the most common *spoken* word
 * surfaces first (e.g. "cup" -> livan, not fenjan). Source: an OpenSubtitles-
 * derived list; see `scripts/build-frequency.mjs`.
 */

// Code points dropped entirely: ZWNJ, ZWJ, LRM, RLM, tatweel, the harakat
// (U+064B..U+0652) and the superscript alef. Working by code point keeps the
// invisible characters out of the source.
const STRIP = new Set<number>([
  0x200c, 0x200d, 0x200e, 0x200f, 0x0640, 0x0670, 0x064b, 0x064c, 0x064d, 0x064e, 0x064f, 0x0650,
  0x0651, 0x0652,
]);

// Arabic letter forms unified to their Persian equivalents.
const REMAP = new Map<number, number>([
  [0x064a, 0x06cc], // Arabic yeh -> Farsi yeh
  [0x0649, 0x06cc], // alef maksura -> Farsi yeh
  [0x0643, 0x06a9], // Arabic kaf -> keheh
  [0x0623, 0x0627], // hamza-on-alef -> alef
  [0x0625, 0x0627], // hamza-under-alef -> alef
  [0x0622, 0x0627], // alef madda -> alef
  [0x0629, 0x0647], // teh marbuta -> heh
]);

// Mirror of scripts/build-frequency.mjs -> normFa so lookups match the keys
// baked into frequency.json.
export const normFa = (input: string): string => {
  let out = '';
  for (const ch of input) {
    const cp = ch.codePointAt(0) ?? 0;
    if (STRIP.has(cp)) continue;
    const mapped = REMAP.get(cp);
    out += mapped === undefined ? ch : String.fromCodePoint(mapped);
  }
  return out.trim();
};

let ranks: Map<string, number> | null = null;

// Populated once at startup from the fetched, frequency-ordered word array.
export const setFrequencyOrder = (words: string[]): void => {
  ranks = new Map(words.map((word, index) => [word, index]));
};

// Frequency rank of an entry's Farsi form; Infinity when unknown (rare word,
// multi-word phrase, or the list hasn't loaded yet).
export const freqRank = (farsi: string | undefined): number => {
  if (!farsi || !ranks) return Infinity;
  return ranks.get(normFa(farsi)) ?? Infinity;
};
