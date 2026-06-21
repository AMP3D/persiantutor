import type { Usage } from '../../models/Entry';
import type { LookupResult, LookupStage } from '../../models/Lookup';

export interface ResultView {
  approximate: boolean;
  corrected: string;
  farsi?: string;
  formal: Usage[];
  informal: Usage[];
  meaning: string;
  note?: string;
  query: string;
  stage: LookupStage;
  tags: string[];
}

export const buildResultView = (result: LookupResult): ResultView | null => {
  const entry = result.entry;
  if (!entry) return null;

  const formal = entry.usages.filter((usage) => usage.register === 'formal');
  const informal = entry.usages.filter((usage) => usage.register === 'informal');

  return {
    approximate: result.approximate,
    corrected: entry.term,
    farsi: entry.farsi,
    formal,
    informal,
    meaning: entry.meaning,
    note: entry.note,
    query: result.query,
    stage: result.stage,
    tags: entry.tags,
  };
};
