import { signal } from '@preact/signals-react';
import { clearSearches } from '../../db/searches';
import { recent, refreshRecent } from '../../state/recent';
import { common } from '../../state/common';
import { openConfirm } from '../../state/ui';
import { wordPath } from '../../utils/paths';
import type { WordListItem } from '../WordList/wordList';

interface LetterGroup {
  label: string;
  from: string;
  to: string;
}

const allLabel = 'All';

const letterGroups: LetterGroup[] = [
  { label: 'A–D', from: 'a', to: 'd' },
  { label: 'E–I', from: 'e', to: 'i' },
  { label: 'J–N', from: 'j', to: 'n' },
  { label: 'O–S', from: 'o', to: 's' },
  { label: 'T–Z', from: 't', to: 'z' },
];

const byTerm = (a: WordListItem, b: WordListItem): number => a.term.localeCompare(b.term);

const inGroup = (term: string, label: string): boolean => {
  const group = letterGroups.find((entry) => entry.label === label);
  if (!group) return true;
  const first = term[0]?.toLowerCase() ?? '';
  return first >= group.from && first <= group.to;
};

export const commonGroup = signal<string>(allLabel);

export const commonFilters: string[] = [allLabel, ...letterGroups.map((group) => group.label)];

export const commonItems = (): WordListItem[] =>
  common.value
    .filter((entry) => inGroup(entry.term, commonGroup.value))
    .map((entry) => ({
      key: `c-${entry.id}`,
      term: entry.term,
      subtitle: entry.meaning,
      path: wordPath(entry.term),
    }))
    .sort(byTerm);

export const recentItems = (): WordListItem[] =>
  recent.value
    .map((record) => ({
      key: `r-${record.id}`,
      term: record.term,
      subtitle: record.resolved ? '' : 'no match',
      path: wordPath(record.query),
    }))
    .sort(byTerm);

export const setCommonGroup = (label: string): void => {
  commonGroup.value = label;
};

export const requestClearRecent = (): void => {
  openConfirm({
    title: 'Clear recent searches?',
    message: 'This removes your recent-lookup history. The dictionary and common words are kept.',
    confirmLabel: 'Clear',
    onConfirm: async () => {
      await clearSearches();
      await refreshRecent();
    },
  });
};
