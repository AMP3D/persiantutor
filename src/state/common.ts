import { signal } from '@preact/signals-react';
import { commonEntries } from '../db/entries';
import type { DictionaryEntry } from '../models/Entry';

export const common = signal<DictionaryEntry[]>([]);

export const refreshCommon = async (): Promise<void> => {
  common.value = await commonEntries();
};
