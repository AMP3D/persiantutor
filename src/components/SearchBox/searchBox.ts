import { signal } from '@preact/signals-react';
import type { NavigateFunction } from 'react-router-dom';
import type { SearchMode } from '../../models/Lookup';
import { wordPath } from '../../utils/paths';

export const query = signal('');

export const searchMode = signal<SearchMode>('finglish');

interface ModeOption {
  value: SearchMode;
  label: string;
  placeholder: string;
}

export const modeOptions: ModeOption[] = [
  { value: 'finglish', label: 'Finglish', placeholder: 'Type a word in "Finglish", e.g. khubam' },
  { value: 'english', label: 'English', placeholder: 'Type a word in English, e.g. water' },
];

export const placeholderFor = (mode: SearchMode): string =>
  modeOptions.find((option) => option.value === mode)?.placeholder ?? '';

export const setSearchMode = (mode: SearchMode): void => {
  searchMode.value = mode;
};

export const submitQuery = (navigate: NavigateFunction): void => {
  const trimmed = query.value.trim();
  if (trimmed) navigate(wordPath(trimmed, searchMode.value));
};
