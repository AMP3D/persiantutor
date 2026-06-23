import { signal } from '@preact/signals-react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { entriesByIds } from '../../db/entries';
import { isAnswerCorrect } from '../../engine/answerMatch';
import type { DictionaryEntry } from '../../models/Entry';
import { common } from '../../state/common';
import { recent } from '../../state/recent';

export type QuizResult = 'correct' | 'incorrect';

export const answer = signal('');

/** Whether the next card should grab focus — only true once the user has started typing answers. */
export const autoFocus = signal(false);

export const deck = signal<DictionaryEntry[]>([]);

export const flipped = signal(false);

export const index = signal(0);

export const result = signal<QuizResult | null>(null);

/** Every common word plus every resolved recent lookup, de-duplicated by normalizedKey. */
const deckSource = signal<DictionaryEntry[]>([]);

/**
 * A blank textbox means "just reveal" (no grade); any answer turns the same flip into a quiz. A wrong
 * answer re-queues the card at the end of the deck (once per visit) so it comes back until guessed
 * right — the counter's total grows to match.
 */
const grade = (): void => {
  const card = deck.value[index.value];
  const guess = answer.value.trim();
  const outcome: QuizResult | null =
    card && guess ? (isAnswerCorrect(guess, card) ? 'correct' : 'incorrect') : null;
  if (card && outcome === 'incorrect' && result.value !== 'incorrect') {
    deck.value = [...deck.value, { ...card }];
  }
  result.value = outcome;
};

const reset = (): void => {
  answer.value = '';
  flipped.value = false;
  result.value = null;
};

const shuffle = (entries: DictionaryEntry[]): DictionaryEntry[] => {
  const copy = [...entries];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildDeck = (): void => {
  deck.value = shuffle(deckSource.value);
  index.value = 0;
  autoFocus.value = false;
  reset();
};

const mergeSources = async (): Promise<DictionaryEntry[]> => {
  const merged: DictionaryEntry[] = [];
  const seen = new Set<string>();
  const add = (entry: DictionaryEntry): void => {
    if (seen.has(entry.normalizedKey)) return;
    seen.add(entry.normalizedKey);
    merged.push(entry);
  };
  common.value.forEach(add);
  const ids = recent.value.filter((row) => row.entryId != null).map((row) => row.entryId as number);
  if (ids.length) (await entriesByIds(ids)).forEach(add);
  return merged;
};

const refreshSource = async (): Promise<void> => {
  deckSource.value = await mergeSources();
};

export const ensureDeck = async (): Promise<void> => {
  await refreshSource();

  if (deck.value.length === 0 && deckSource.value.length > 0) buildDeck();
};

export const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
  answer.value = event.target.value;
};

export const handleSubmit = (event: FormEvent): void => {
  event.preventDefault();

  if (flipped.value) {
    next();
    return;
  }

  grade();
  flipped.value = true;
};

export const next = (): void => {
  if (index.value < deck.value.length - 1) {
    autoFocus.value = answer.value.trim() !== '';
    index.value += 1;
    reset();
  }
};

export const prev = (): void => {
  if (index.value > 0) {
    autoFocus.value = answer.value.trim() !== '';
    index.value -= 1;
    reset();
  }
};

export const reshuffle = async (): Promise<void> => {
  await refreshSource();
  buildDeck();
};

export const reveal = (): void => {
  if (flipped.value) {
    flipped.value = false;
    return;
  }
  grade();
  flipped.value = true;
};

/** Keep clicks inside the answer box from bubbling up and flipping the card. */
export const stopFlip = (event: MouseEvent): void => {
  event.stopPropagation();
};

/**
 * Mirror the on-screen keyboard's height into a `--keyboard-inset` CSS variable so the card can lift
 * its content above it (mobile only — desktop focus never shrinks the visual viewport). Returns a
 * cleanup that detaches the listeners and clears the variable.
 */
export const trackKeyboard = (): (() => void) => {
  const viewport = window.visualViewport;
  if (!viewport) return () => {};
  const root = document.documentElement;
  const update = (): void => {
    const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
    root.style.setProperty('--keyboard-inset', `${inset}px`);
  };
  update();
  viewport.addEventListener('resize', update);
  viewport.addEventListener('scroll', update);
  return () => {
    viewport.removeEventListener('resize', update);
    viewport.removeEventListener('scroll', update);
    root.style.removeProperty('--keyboard-inset');
  };
};
