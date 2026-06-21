import { signal } from '@preact/signals-react';
import type { NavigateFunction } from 'react-router-dom';
import { wordPath } from '../../utils/paths';

export const query = signal('');

export const submitQuery = (navigate: NavigateFunction): void => {
  const trimmed = query.value.trim();
  if (trimmed) navigate(wordPath(trimmed));
};
