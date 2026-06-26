import { signal } from '@preact/signals-react';
import { recordSearch } from '../db/searches';
import { lookup } from '../engine/lookup';
import type { LookupResult, LookupStatus, SearchMode } from '../models/Lookup';
import { refreshRecent } from './recent';

export const result = signal<LookupResult | null>(null);

export const status = signal<LookupStatus>('idle');

export const runSearch = async (query: string, mode: SearchMode = 'finglish'): Promise<void> => {
  const trimmed = query.trim();
  if (!trimmed) return;

  status.value = 'searching';
  result.value = null;

  const outcome = await lookup(trimmed, mode);

  result.value = outcome;
  status.value = 'done';

  await recordSearch({
    query: trimmed,
    normalizedKey: outcome.normalizedKey,
    term: outcome.entry?.term ?? trimmed,
    entryId: outcome.entry?.id,
    resolved: Boolean(outcome.entry),
    mode,
    at: Date.now(),
  });
  await refreshRecent();
};
