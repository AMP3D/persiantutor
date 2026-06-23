export type ScrollMode = 'capped' | 'flex' | undefined;

export interface WordListItem {
  key: string;
  term: string;
  subtitle: string;
  path: string;
  onRemove?: () => void;
}

export const buildScrollClass = (mode: ScrollMode): string => {
  const base = 'word-list__items';
  if (mode === 'capped') return `${base} ${base}--capped`;
  if (mode === 'flex') return `${base} ${base}--flex`;
  return base;
};
