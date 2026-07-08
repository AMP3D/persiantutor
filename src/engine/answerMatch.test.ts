import { describe, expect, it } from 'vitest';
import { calendarEntries } from '../data/calendar';
import { numberEntries } from '../data/numbers';
import type { DictionaryEntry } from '../models/Entry';
import { isAnswerCorrect } from './answerMatch';

const byTerm = (entries: DictionaryEntry[], term: string): DictionaryEntry => {
  const found = entries.find((entry) => entry.term === term);
  if (!found) throw new Error(`missing entry: ${term}`);
  return found;
};

// Minimal entry — isAnswerCorrect only reads `meaning` and each usage's `english`.
const entry = (meaning: string, ...english: string[]): DictionaryEntry => ({
  term: 'x',
  normalizedKey: 'x',
  aliases: [],
  meaning,
  usages: english.map((value) => ({ register: 'informal', finglish: '', english: value })),
  tags: [],
  source: 'seed',
  createdAt: 0,
});

describe('answer matching — reported cases', () => {
  it('ignores parentheticals (berenj → "rice (uncooked)")', () => {
    const berenj = entry('rice (uncooked)');
    expect(isAnswerCorrect('rice', berenj)).toBe(true);
    expect(isAnswerCorrect('rice (uncooked)', berenj)).toBe(true);
    expect(isAnswerCorrect('bread', berenj)).toBe(false);
  });

  it('splits the lead gloss off a dash clause (zahremar → "snake venom — …")', () => {
    const zahremar = entry('snake venom — an interjection like "shut up! / damn it!"');
    expect(isAnswerCorrect('snake venom', zahremar)).toBe(true);
    expect(isAnswerCorrect('damn it', zahremar)).toBe(true);
    expect(isAnswerCorrect('sweat', zahremar)).toBe(false);
  });

  it('treats paternal/maternal as optional (amu → "uncle", ameh → "aunt")', () => {
    const amu = entry("paternal uncle (father's brother)", 'Uncle is home.');
    const ameh = entry("paternal aunt (father's sister)", 'My aunt came.');
    expect(isAnswerCorrect('uncle', amu)).toBe(true);
    expect(isAnswerCorrect('paternal uncle', amu)).toBe(true);
    expect(isAnswerCorrect('aunt', ameh)).toBe(true);
    expect(isAnswerCorrect('aunt', amu)).toBe(false); // still not the same word
  });

  it('does not accept near-miss weekday names for one another', () => {
    const saturday = entry('Saturday');
    const monday = entry('Monday');
    expect(isAnswerCorrect('saturday', saturday)).toBe(true);
    expect(isAnswerCorrect('sunday', saturday)).toBe(false);
    expect(isAnswerCorrect('monday', monday)).toBe(true);
    expect(isAnswerCorrect('sunday', monday)).toBe(false);
  });

  it('accepts a Jalali month by its Gregorian span (farvardin → March/April)', () => {
    const farvardin = entry('1st month — March/April');
    expect(isAnswerCorrect('march', farvardin)).toBe(true);
    expect(isAnswerCorrect('april', farvardin)).toBe(true);
    expect(isAnswerCorrect('june', farvardin)).toBe(false);
  });

  it('treats spelled-out numbers and digits as equal but exact (yek → "one")', () => {
    const yek = entry('one');
    expect(isAnswerCorrect('1', yek)).toBe(true);
    expect(isAnswerCorrect('one', yek)).toBe(true);
    expect(isAnswerCorrect('2', yek)).toBe(false);
  });

  it('forgives a single-character typo but not a partial phrase', () => {
    expect(isAnswerCorrect('stupd', entry('idiot, stupid'))).toBe(true);
    expect(isAnswerCorrect('used', entry('get used to it'))).toBe(false);
  });
});

describe('themed set data resolves through the answer engine', () => {
  it('numbers accept the digit or the spelled-out value (bist → 20/twenty)', () => {
    const bist = byTerm(numberEntries, 'bist');
    expect(isAnswerCorrect('20', bist)).toBe(true);
    expect(isAnswerCorrect('twenty', bist)).toBe(true);
    expect(isAnswerCorrect('30', bist)).toBe(false);
  });

  it('calendar entries answer with day name / Gregorian span', () => {
    expect(isAnswerCorrect('saturday', byTerm(calendarEntries, 'shanbe'))).toBe(true);
    expect(isAnswerCorrect('september', byTerm(calendarEntries, 'mehr'))).toBe(true);
    expect(isAnswerCorrect('friday', byTerm(calendarEntries, 'shanbe'))).toBe(false);
  });
});
