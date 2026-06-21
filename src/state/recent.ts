import { signal } from '@preact/signals-react';
import { recentSearches } from '../db/searches';
import type { SearchRecord } from '../models/Search';

export const recent = signal<SearchRecord[]>([]);

export const refreshRecent = async (): Promise<void> => {
  recent.value = await recentSearches();
};
