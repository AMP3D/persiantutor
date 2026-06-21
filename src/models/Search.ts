export interface SearchRecord {
  id?: number;
  query: string;
  normalizedKey: string;
  term: string;
  entryId?: number;
  resolved: boolean;
  at: number;
}
