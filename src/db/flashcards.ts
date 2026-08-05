import { getSetting, setSetting } from './settings';

/** Flash-card study state persisted in the settings KV store. */
export type GroupSize = number | 'all';

/** Per-word miss counter; rises on a wrong answer, falls on a correct one. */
export type MissCounts = Record<string, number>;

/** Group id → normalizedKeys answered correctly in that group. */
export type GroupProgress = Record<string, string[]>;

const SIZE_KEY = 'flashcards.size';
const MISSES_KEY = 'flashcards.misses';
const PROGRESS_KEY = 'flashcards.progress';
const FINGLISH_KEY = 'flashcards.finglish';
const PHRASES_KEY = 'flashcards.phrases';

export const loadGroupSize = async (): Promise<GroupSize> =>
  (await getSetting<GroupSize>(SIZE_KEY)) ?? 20;

export const saveGroupSize = (size: GroupSize): Promise<void> => setSetting(SIZE_KEY, size);

export const loadMisses = async (): Promise<MissCounts> =>
  (await getSetting<MissCounts>(MISSES_KEY)) ?? {};

export const saveMisses = (misses: MissCounts): Promise<void> => setSetting(MISSES_KEY, misses);

export const loadProgress = async (): Promise<GroupProgress> =>
  (await getSetting<GroupProgress>(PROGRESS_KEY)) ?? {};

export const saveProgress = (progress: GroupProgress): Promise<void> =>
  setSetting(PROGRESS_KEY, progress);

export const loadShowFinglish = async (): Promise<boolean> =>
  (await getSetting<boolean>(FINGLISH_KEY)) ?? true;

export const saveShowFinglish = (show: boolean): Promise<void> => setSetting(FINGLISH_KEY, show);

export const loadShowPhrases = async (): Promise<boolean> =>
  (await getSetting<boolean>(PHRASES_KEY)) ?? false;

export const saveShowPhrases = (show: boolean): Promise<void> => setSetting(PHRASES_KEY, show);
