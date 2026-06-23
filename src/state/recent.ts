import { signal } from '@preact/signals-react';
import { deleteSearchesByKey, recentSearches } from '../db/searches';
import type { SearchRecord } from '../models/Search';

export const recent = signal<SearchRecord[]>([]);

export const refreshRecent = async (): Promise<void> => {
  recent.value = await recentSearches();
};

export const removeRecent = async (normalizedKey: string): Promise<void> => {
  await deleteSearchesByKey(normalizedKey);
  await refreshRecent();
};
