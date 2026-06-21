import type { DictionaryEntry } from '../models/Entry';
import { editDistance } from './fuzzy';

/**
 * Tolerant English answer-checking for the flash-card quiz. A guess counts as
 * correct when its meaningful words match those of the card's meaning (or any
 * comma/slash-separated synonym) or one of its usage translations. Filler words
 * (articles, pronouns, the infinitive "to", auxiliaries) and tense suffixes are
 * stripped, word order is ignored, and small typos are absorbed via edit
 * distance, so for "khabidan" both "Sleep" and "They slept" resolve correctly.
 */

const stopwords = new Set([
  'a',
  'an',
  'the',
  'to',
  'of',
  'for',
  'and',
  'or',
  'but',
  'that',
  'this',
  'these',
  'those',
  'it',
  'its',
  'is',
  'are',
  'was',
  'were',
  'am',
  'be',
  'been',
  'being',
  'do',
  'does',
  'did',
  'will',
  'would',
  'shall',
  'should',
  'can',
  'could',
  'may',
  'might',
  'must',
  'please',
  'so',
  'very',
  'just',
  'some',
  'any',
  'i',
  'you',
  'he',
  'she',
  'we',
  'they',
  'me',
  'him',
  'her',
  'us',
  'them',
  'my',
  'your',
  'his',
  'our',
  'their',
  'mine',
  'yours',
  'ours',
  'theirs',
]);

const wordTolerance = (length: number): number => (length <= 4 ? 1 : length <= 7 ? 2 : 3);

const stem = (word: string): string => {
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
};

const tokenize = (value: string): string[] => {
  const words = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const meaningful = words.filter((word) => !stopwords.has(word));
  return (meaningful.length ? meaningful : words).map(stem);
};

const wordsClose = (a: string, b: string): boolean =>
  a === b || editDistance(a, b) <= wordTolerance(Math.max(a.length, b.length));

const tokensMatch = (guess: string[], candidate: string[]): boolean => {
  if (!guess.length || guess.length !== candidate.length) return false;
  const pool = [...candidate];
  for (const word of guess) {
    const i = pool.findIndex((other) => wordsClose(word, other));
    if (i === -1) return false;
    pool.splice(i, 1);
  }
  return true;
};

const splitParts = (value: string): string[] =>
  value
    .split(/[,;/]|\bor\b/i)
    .map((part) => part.trim())
    .filter(Boolean);

const acceptableAnswers = (entry: DictionaryEntry): string[] => {
  const answers = [entry.meaning, ...splitParts(entry.meaning)];
  for (const usage of entry.usages) {
    answers.push(usage.english, ...splitParts(usage.english));
  }
  return answers;
};

export const isAnswerCorrect = (guess: string, entry: DictionaryEntry): boolean => {
  const guessTokens = tokenize(guess);
  if (!guessTokens.length) return false;
  return acceptableAnswers(entry).some((answer) => tokensMatch(guessTokens, tokenize(answer)));
};
