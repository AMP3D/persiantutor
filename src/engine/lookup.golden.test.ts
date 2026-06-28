import { readFileSync } from 'node:fs';
import { beforeAll, describe, expect, it } from 'vitest';
import { commonWords } from '../data/commonWords';
import type { DictionaryEntry } from '../models/Entry';
import { findAllByMeaning, normalizeEnglish } from './english';
import { setFrequencyOrder } from './frequency';
import { normalize } from './normalize';
import { setSenses } from './senses';

// Golden regression suite: runs the REAL English-lookup ranking over the REAL
// shipped data (public/*.json) plus the curated seeds. Every case below is a bug
// we fixed; if a future change regresses one (e.g. corpus noise floating "coffee"
// above "cup", or the ġ→gh keying breaking), this suite fails. Add a case here
// for each new issue rather than fixing it blind.

const read = (path: string): unknown => JSON.parse(readFileSync(path, 'utf8'));

let entries: DictionaryEntry[];

beforeAll(() => {
  const dict = read('public/dictionary.json') as [string, string, string, string][];
  setFrequencyOrder(read('public/frequency.json') as string[]);
  setSenses(read('public/senses.json') as Record<string, string[]>);

  const toEntry = (
    term: string,
    farsi: string,
    meaning: string,
    source: DictionaryEntry['source'],
  ): DictionaryEntry => ({
    term,
    farsi,
    meaning,
    normalizedKey: normalize(term),
    aliases: [],
    usages: [],
    tags: [],
    source,
    createdAt: 0,
  });

  entries = [
    ...commonWords.map((s) => toEntry(s.term, s.farsi ?? '', s.meaning, 'seed')),
    ...dict.map((t) => toEntry(t[0], t[1], t[2], 'dict')),
  ];
});

const primary = (query: string): DictionaryEntry | undefined =>
  findAllByMeaning(entries, normalizeEnglish(query), 12)[0];

describe('English lookup — most common spoken word ranks first', () => {
  // Unambiguous: assert the exact word (compared by normalized key so the â/ā
  // diacritics in the term don't make the test brittle).
  it.each([
    ['cup', 'livan'],
    ['motorcycle', 'mutur'], // normalize('motor') → 'mutur' (o→u rule)
    ['water', 'ab'],
  ])('"%s" → %s', (query, expectedKey) => {
    expect(normalize(primary(query)?.term ?? '')).toBe(expectedKey);
  });

  // Several valid translations exist — just assert the primary genuinely carries
  // the sense (and isn't a frequency-driven impostor).
  it.each([
    ['coffee', 'coffee'],
    ['glass', 'glass'],
    ['dog', 'dog'],
    ['beautiful', 'beautiful'],
  ])('"%s" primary actually means it', (query, sense) => {
    expect(primary(query)?.meaning.toLowerCase()).toContain(sense);
  });
});

describe('English lookup — regressions stay fixed', () => {
  it('"cup" never returns coffee as the primary (hidden-sense tiering)', () => {
    expect(primary('cup')?.meaning.toLowerCase()).not.toContain('coffee');
  });

  it('"beautiful" is not hijacked by the frequent homograph "moon"', () => {
    expect(primary('beautiful')?.meaning.toLowerCase()).not.toContain('moon');
  });
});

describe('Finglish keying — ġ→gh so ق-words match exactly', () => {
  it('"gharar" keys to قرار (not a fuzzy near-miss)', () => {
    const hit = entries.find((e) => e.normalizedKey === 'gharar');
    expect(hit?.farsi).toContain('قرار');
  });

  it('"ghahve" / "ghalb" key onto their ق-entries', () => {
    expect(entries.some((e) => e.normalizedKey === 'ghahve' && /coffee/i.test(e.meaning))).toBe(true);
    expect(entries.some((e) => e.normalizedKey === 'ghalb' && /heart/i.test(e.meaning))).toBe(true);
  });
});
