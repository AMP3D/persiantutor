import type { SearchMode } from './Lookup';

export interface SearchRecord {
  id?: number;
  query: string;
  normalizedKey: string;
  term: string;
  entryId?: number;
  resolved: boolean;
  mode?: SearchMode;
  at: number;
}
