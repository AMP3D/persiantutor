import { signal } from '@preact/signals-react';
import type { LetterEntry } from '../../data/alphabet';

export type AlphabetMode = 'cards' | 'grid';

export const alphabetMode = signal<AlphabetMode>('grid');

export const setAlphabetMode = (mode: AlphabetMode): void => {
  alphabetMode.value = mode;
};

export const letterForms: Array<{ key: keyof LetterEntry; label: string }> = [
  { key: 'isolated', label: 'Isolated' },
  { key: 'initial', label: 'Initial' },
  { key: 'medial', label: 'Medial' },
  { key: 'final', label: 'Final' },
];
