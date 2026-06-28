// Regenerate public/frequency.json from an OpenSubtitles-derived Persian
// word-frequency list (spoken/conversational usage), so English lookups can
// rank the *most common spoken* translation first (e.g. "cup" -> livân).
//   1. curl -sL https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/fa/fa_50k.txt -o _fa_freq.txt
//   2. node scripts/build-frequency.mjs
// Output: a JSON array of normalized Persian words, ordered most-common-first.
// The app loads it into a Map(word -> index); a lower index means more common.
// Source: hermitdave/FrequencyWords (MIT), derived from OpenSubtitles.
import { readFileSync, writeFileSync } from 'node:fs';

// Mirror of engine/frequency.ts → normFa so generated keys match runtime keys:
// drop ZWNJ/tatweel/harakat and unify Arabic vs Persian letter forms.
const normFa = (s) =>
  s
    .replace(/[‌‍‎‏ـ]/g, '') // ZWNJ, ZWJ, LRM, RLM, tatweel
    .replace(/[ً-ْٰ]/g, '') // harakat + superscript alef
    .replace(/[يى]/g, 'ی') // Arabic yeh / alef maksura -> Farsi yeh
    .replace(/ك/g, 'ک') // Arabic kaf -> keheh
    .replace(/[أإآ]/g, 'ا') // hamza/madda alef -> alef
    .replace(/ة/g, 'ه') // teh marbuta -> heh
    .trim();

// Keep every word that is the Farsi form of a dictionary entry, plus the
// overall most-common COMMON_HEAD words (covers curated seed words and gives
// good resolution among the everyday vocabulary). Order is preserved, so a
// kept word's index still reflects its true frequency rank.
const COMMON_HEAD = 8000;

const run = () => {
  const lines = readFileSync('_fa_freq.txt', 'utf8').split('\n');
  const ordered = [];
  const rankOf = new Map();
  for (const line of lines) {
    const word = line.split(' ')[0];
    if (!word) continue;
    const key = normFa(word);
    if (key && !rankOf.has(key)) {
      rankOf.set(key, ordered.length);
      ordered.push(key);
    }
  }

  const dict = JSON.parse(readFileSync('public/dictionary.json', 'utf8'));
  const dictFarsi = new Set();
  for (const tuple of dict) if (tuple[1]) dictFarsi.add(normFa(tuple[1]));

  const kept = ordered.filter((word, index) => index < COMMON_HEAD || dictFarsi.has(word));
  writeFileSync('public/frequency.json', JSON.stringify(kept));

  console.log('source words:', rankOf.size, '| dict farsi:', dictFarsi.size, '| kept:', kept.length);
  const keptRank = new Map(kept.map((w, i) => [w, i]));
  for (const [fin, fa] of [
    ['livân', 'لیوان'],
    ['fenjân', 'فنجان'],
    ['jâm', 'جام'],
    ['estekân', 'استکان'],
    ['tâs', 'طاس'],
  ]) {
    const k = normFa(fa);
    console.log(`  ${fin.padEnd(9)} -> ${keptRank.has(k) ? keptRank.get(k) : 'rare'}`);
  }
};

run();
