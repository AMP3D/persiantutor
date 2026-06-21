import { signal } from '@preact/signals-react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { isAnswerCorrect } from '../../engine/answerMatch';
import type { DictionaryEntry } from '../../models/Entry';
import { common } from '../../state/common';

export type QuizResult = 'correct' | 'incorrect';

export const answer = signal('');

export const deck = signal<DictionaryEntry[]>([]);

export const flipped = signal(false);

export const index = signal(0);

export const result = signal<QuizResult | null>(null);

/** A blank textbox means "just reveal" (no grade); any answer turns the same flip into a quiz. */
const grade = (): void => {
  const card = deck.value[index.value];
  const guess = answer.value.trim();
  result.value = card && guess ? (isAnswerCorrect(guess, card) ? 'correct' : 'incorrect') : null;
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

export const buildDeck = (): void => {
  deck.value = shuffle(common.value);
  index.value = 0;
  reset();
};

export const ensureDeck = (): void => {
  if (deck.value.length === 0 && common.value.length > 0) buildDeck();
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
    index.value += 1;
    reset();
  }
};

export const prev = (): void => {
  if (index.value > 0) {
    index.value -= 1;
    reset();
  }
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
