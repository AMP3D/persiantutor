import { signal } from '@preact/signals-react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { frequencyRank } from '../../data/frequency';
import { entriesByIds } from '../../db/entries';
import {
  type GroupProgress,
  type GroupSize,
  type MissCounts,
  loadGroupSize,
  loadMisses,
  loadProgress,
  saveGroupSize,
  saveMisses,
  saveProgress,
} from '../../db/flashcards';
import { isAnswerCorrect } from '../../engine/answerMatch';
import type { DictionaryEntry } from '../../models/Entry';
import { common } from '../../state/common';
import { recent } from '../../state/recent';
import { openConfirm } from '../../state/ui';

export type { GroupSize } from '../../db/flashcards';

export type QuizResult = 'correct' | 'incorrect';

export interface GroupInfo {
  id: string;
  title: string;
  hint?: string;
  cards: DictionaryEntry[];
}

export interface SetTile {
  id: string;
  title: string;
  hint: string;
  done: number;
  total: number;
  complete: boolean;
}

export const groupSizeOptions: GroupSize[] = [10, 20, 50, 100, 'all'];

const MISSED_LIMIT = 20;

export const answer = signal('');

/** Whether the next card should grab focus — only true once the user has started typing answers. */
export const autoFocus = signal(false);

export const deck = signal<DictionaryEntry[]>([]);

export const flipped = signal(false);

export const groupId = signal('');

export const groupSize = signal<GroupSize>(20);

export const groups = signal<GroupInfo[]>([]);

export const index = signal(0);

/** Per-word miss counter (rises on a wrong answer, falls on a correct one); drives the missed group. */
export const misses = signal<MissCounts>({});

/** Group id → normalizedKeys answered correctly; persisted so each group resumes where it left off. */
export const progress = signal<GroupProgress>({});

export const result = signal<QuizResult | null>(null);

/** False shows the set-picker grid; true shows the card view for the chosen set. */
export const studying = signal(false);

const recentEntries = signal<DictionaryEntry[]>([]);

let loaded = false;

const activeGroup = (): GroupInfo | undefined =>
  groups.value.find((group) => group.id === groupId.value) ?? groups.value[0];

const sortedCommon = (): DictionaryEntry[] =>
  [...common.value].sort(
    (a, b) =>
      frequencyRank(a.normalizedKey) - frequencyRank(b.normalizedKey) ||
      a.term.localeCompare(b.term),
  );

const missedCards = (lookup: Map<string, DictionaryEntry>): DictionaryEntry[] =>
  Object.entries(misses.value)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MISSED_LIMIT)
    .map(([key]) => lookup.get(key))
    .filter((entry): entry is DictionaryEntry => Boolean(entry));

const buildGroups = (): void => {
  const commonCards = sortedCommon();
  const lookup = new Map<string, DictionaryEntry>();
  for (const entry of [...commonCards, ...recentEntries.value]) {
    if (!lookup.has(entry.normalizedKey)) lookup.set(entry.normalizedKey, entry);
  }

  const list: GroupInfo[] = [];
  const size = groupSize.value;
  if (commonCards.length) {
    if (size === 'all') {
      list.push({ id: 'all', title: 'All words', cards: commonCards });
    } else {
      const count = Math.ceil(commonCards.length / size);
      for (let i = 0; i < count; i++) {
        const cards = commonCards.slice(i * size, i * size + size);
        const hint =
          count > 1 && i === 0 ? 'easiest' : count > 1 && i === count - 1 ? 'hardest' : undefined;
        list.push({ id: `common:${size}:${i}`, title: `Set ${i + 1}`, hint, cards });
      }
    }
  }
  if (recentEntries.value.length) {
    list.push({ id: 'recent', title: 'Recent', cards: recentEntries.value });
  }
  const missed = missedCards(lookup);
  if (missed.length) {
    list.push({ id: 'missed', title: 'Most missed', cards: missed });
  }

  groups.value = list;
  if (!list.some((group) => group.id === groupId.value)) groupId.value = list[0]?.id ?? '';
};

const reset = (): void => {
  answer.value = '';
  flipped.value = false;
  result.value = null;
};

const shuffle = (entries: DictionaryEntry[]): DictionaryEntry[] => {
  const copy = [...entries];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildDeck = (): void => {
  const group = activeGroup();
  const done = new Set(group ? (progress.value[group.id] ?? []) : []);
  deck.value = group ? shuffle(group.cards.filter((card) => !done.has(card.normalizedKey))) : [];
  index.value = 0;
  autoFocus.value = false;
  reset();
};

const bumpMiss = (key: string, delta: number): void => {
  const count = Math.max(0, (misses.value[key] ?? 0) + delta);
  const next = { ...misses.value };
  if (count === 0) delete next[key];
  else next[key] = count;
  misses.value = next;
  void saveMisses(next);
};

const markDone = (key: string): void => {
  const group = activeGroup();
  if (!group) return;
  const current = progress.value[group.id] ?? [];
  if (current.includes(key)) return;
  const next = { ...progress.value, [group.id]: [...current, key] };
  progress.value = next;
  void saveProgress(next);
};

/**
 * Grading also drives spaced repetition: a wrong answer re-queues the card at the end of the deck and
 * bumps its miss count; a right answer marks it done in the active group and eases its miss count so
 * it can fall out of the "most missed" group.
 */
const grade = (): void => {
  const card = deck.value[index.value];
  const guess = answer.value.trim();
  const outcome: QuizResult | null =
    card && guess ? (isAnswerCorrect(guess, card) ? 'correct' : 'incorrect') : null;
  if (card && outcome === 'incorrect' && result.value !== 'incorrect') {
    deck.value = [...deck.value, { ...card }];
    bumpMiss(card.normalizedKey, 1);
  } else if (card && outcome === 'correct' && result.value !== 'correct') {
    markDone(card.normalizedKey);
    bumpMiss(card.normalizedKey, -1);
  }
  result.value = outcome;
};

const refresh = async (): Promise<void> => {
  const ids = recent.value.filter((row) => row.entryId != null).map((row) => row.entryId as number);
  recentEntries.value = ids.length ? await entriesByIds(ids) : [];
  buildGroups();
};

export const clearGroup = (): void => {
  const group = activeGroup();
  if (!group) return;
  const next = { ...progress.value };
  delete next[group.id];
  progress.value = next;
  void saveProgress(next);
  buildDeck();
};

export const ensureDeck = async (): Promise<void> => {
  if (!loaded) {
    loaded = true;
    const [size, savedMisses, savedProgress] = await Promise.all([
      loadGroupSize(),
      loadMisses(),
      loadProgress(),
    ]);
    groupSize.value = size;
    misses.value = savedMisses;
    progress.value = savedProgress;
  }
  await refresh();
  if (deck.value.length === 0 && activeGroup()) buildDeck();
};

export const closeSet = (): void => {
  studying.value = false;
  buildGroups();
};

export const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
  answer.value = event.target.value;
};

export const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
  const value = event.target.value;
  setGroupSize(value === 'all' ? 'all' : Number(value));
};

export const handleSubmit = (event: FormEvent): void => {
  event.preventDefault();
  if (flipped.value) {
    // Advancing past the last card of a set returns to the grid so a new set can be picked. A wrong
    // answer re-queues a copy (growing the deck), so we only leave once nothing remains ahead.
    if (index.value >= deck.value.length - 1) closeSet();
    else next();
    return;
  }
  grade();
  flipped.value = true;
};

/** Whether any set has learned progress — gates the "reset all" control. */
export const hasProgress = (): boolean =>
  Object.values(progress.value).some((keys) => keys.length > 0);

export const next = (): void => {
  if (index.value < deck.value.length - 1) {
    autoFocus.value = answer.value.trim() !== '';
    index.value += 1;
    reset();
  }
};

export const prev = (): void => {
  if (index.value > 0) {
    autoFocus.value = answer.value.trim() !== '';
    index.value -= 1;
    reset();
  }
};

export const resetAllSets = (): void => {
  openConfirm({
    title: 'Reset all sets?',
    message:
      'This clears your learned progress for every set so you can start over. The word lists and your most-missed history stay.',
    confirmLabel: 'Reset all',
    onConfirm: async () => {
      progress.value = {};
      await saveProgress({});
      buildDeck();
    },
  });
};

export const reshuffle = async (): Promise<void> => {
  await refresh();
  buildDeck();
};

export const reveal = (): void => {
  if (flipped.value) {
    flipped.value = false;
    return;
  }
  grade();
  flipped.value = true;
};

export const openSet = (id: string): void => {
  groupId.value = id;
  buildDeck();
  studying.value = true;
};

export const setGroupSize = (size: GroupSize): void => {
  groupSize.value = size;
  void saveGroupSize(size);
  buildGroups();
  buildDeck();
};

// Count only the done keys still present in the set — the missed set is dynamic, so a relearned word
// leaves it and must not keep inflating its "done" tally past its size.
const doneCount = (group: GroupInfo): number => {
  const done = new Set(progress.value[group.id] ?? []);
  return group.cards.reduce((sum, card) => sum + (done.has(card.normalizedKey) ? 1 : 0), 0);
};

/** One tile per set for the picker grid: title, optional difficulty hint, and learned/total count. */
export const setTiles = (): SetTile[] =>
  groups.value.map((group) => {
    const done = doneCount(group);
    return {
      id: group.id,
      title: group.title,
      hint: group.hint ?? '',
      done,
      total: group.cards.length,
      complete: group.cards.length > 0 && done >= group.cards.length,
    };
  });

/** Active set's title + progress for the card-view header. */
export const stats = (): { title: string; hint: string; done: number; total: number } => {
  const group = activeGroup();
  if (!group) return { title: '', hint: '', done: 0, total: 0 };
  return {
    title: group.title,
    hint: group.hint ?? '',
    done: doneCount(group),
    total: group.cards.length,
  };
};

/** Keep clicks inside the answer box from bubbling up and flipping the card. */
export const stopFlip = (event: MouseEvent): void => {
  event.stopPropagation();
};

/**
 * Mirror the on-screen keyboard's height into a `--keyboard-inset` CSS variable so the card can lift
 * its content above it (mobile only — desktop focus never shrinks the visual viewport). Returns a
 * cleanup that detaches the listeners and clears the variable.
 */
export const trackKeyboard = (): (() => void) => {
  const viewport = window.visualViewport;
  if (!viewport) return () => {};
  const root = document.documentElement;
  const update = (): void => {
    const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
    root.style.setProperty('--keyboard-inset', `${inset}px`);
  };
  update();
  viewport.addEventListener('resize', update);
  viewport.addEventListener('scroll', update);
  return () => {
    viewport.removeEventListener('resize', update);
    viewport.removeEventListener('scroll', update);
    root.style.removeProperty('--keyboard-inset');
  };
};
