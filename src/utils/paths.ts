import type { SearchMode } from '../models/Lookup';

export const wordPath = (term: string, mode: SearchMode = 'finglish'): string => {
  const path = `/w/${encodeURIComponent(term.trim())}`;
  return mode === 'english' ? `${path}?lang=en` : path;
};
