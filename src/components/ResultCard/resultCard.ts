import type { Usage } from '../../models/Entry';
import type { LookupResult, LookupStage } from '../../models/Lookup';
import { wordPath } from '../../utils/paths';

export interface AlternateItem {
  term: string;
  meaning: string;
  path: string;
}

export interface ResultView {
  approximate: boolean;
  corrected: string;
  farsi?: string;
  formal: Usage[];
  informal: Usage[];
  meaning: string;
  note?: string;
  query: string;
  spoken: Usage[];
  stage: LookupStage;
  tags: string[];
  alternates: AlternateItem[];
}

export const buildResultView = (result: LookupResult): ResultView | null => {
  const entry = result.entry;
  if (!entry) return null;

  const formal = entry.usages.filter((usage) => usage.register === 'formal');
  const informal = entry.usages.filter((usage) => usage.register === 'informal');
  const spoken = entry.usages.filter((usage) => usage.register === 'spoken');

  const alternates = (result.alternates ?? []).map((alt) => ({
    term: alt.term,
    meaning: alt.meaning,
    path: wordPath(alt.term),
  }));

  return {
    approximate: result.approximate,
    corrected: entry.term,
    farsi: entry.farsi,
    formal,
    informal,
    meaning: entry.meaning,
    note: entry.note,
    query: result.query,
    spoken,
    stage: result.stage,
    tags: entry.tags,
    alternates,
  };
};
