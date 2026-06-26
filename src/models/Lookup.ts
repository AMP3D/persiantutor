import type { DictionaryEntry } from './Entry';

export type SearchMode = 'finglish' | 'english';

export type LookupStage = 'exact' | 'derived' | 'fuzzy' | 'llm' | 'none';

export type LookupStatus = 'idle' | 'searching' | 'generating' | 'done';

export interface LookupResult {
  query: string;
  normalizedKey: string;
  entry: DictionaryEntry | null;
  stage: LookupStage;
  approximate: boolean;
}
