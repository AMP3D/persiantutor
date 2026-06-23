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

// Spelled-out numbers and digits share a canonical form so "1" matches "one".
const numberWords: Record<string, string> = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
  eleven: '11',
  twelve: '12',
  thirteen: '13',
  fourteen: '14',
  fifteen: '15',
  sixteen: '16',
  seventeen: '17',
  eighteen: '18',
  nineteen: '19',
  twenty: '20',
  thirty: '30',
  forty: '40',
  fifty: '50',
  sixty: '60',
  seventy: '70',
  eighty: '80',
  ninety: '90',
  hundred: '100',
  thousand: '1000',
  million: '1000000',
};

const normalizeWord = (word: string): string => {
  const stemmed = stem(word);
  return numberWords[stemmed] ?? stemmed;
};

const tokenize = (value: string): string[] => {
  const words = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const meaningful = words.filter((word) => !stopwords.has(word));
  return (meaningful.length ? meaningful : words).map(normalizeWord);
};

const wordsClose = (a: string, b: string): boolean => {
  if (a === b) return true;
  // Numbers must match exactly — "2" is not a typo of "1".
  if (/\d/.test(a) || /\d/.test(b)) return false;
  return editDistance(a, b) <= wordTolerance(Math.max(a.length, b.length));
};

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

/**
 * A meaning string yields several acceptable answers: the whole thing, each comma/slash-separated
 * synonym, and the same again with parentheticals dropped — so "rice (uncooked)" accepts both the
 * full phrase and a bare "rice".
 */
const expand = (value: string): string[] => {
  const variants = [value, value.replace(/\([^)]*\)/g, ' ')];
  return variants.flatMap((variant) => [variant, ...splitParts(variant)]);
};

const acceptableAnswers = (entry: DictionaryEntry): string[] => {
  const answers = expand(entry.meaning);
  for (const usage of entry.usages) {
    answers.push(...expand(usage.english));
  }
  return answers;
};

export const isAnswerCorrect = (guess: string, entry: DictionaryEntry): boolean => {
  const guessTokens = tokenize(guess);
  if (!guessTokens.length) return false;
  return acceptableAnswers(entry).some((answer) => tokensMatch(guessTokens, tokenize(answer)));
};
