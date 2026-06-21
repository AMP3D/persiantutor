import { signal } from '@preact/signals-react';
import { generateEntry } from '../engine/llm';
import type { DictionaryEntry } from '../models/Entry';
import { llmEnabled, llmReady, setLlmProgress } from './llm';

export type AiStatus = 'idle' | 'loading' | 'done' | 'error';

export const aiEntry = signal<DictionaryEntry | null>(null);

export const aiStatus = signal<AiStatus>('idle');

// The specific word the user opted into AI for on the current page (per-page mode).
export const aiActiveFor = signal('');

let pending = '';

export const resetAiAssist = (): void => {
  pending = '';
  aiStatus.value = 'idle';
  aiEntry.value = null;
  aiActiveFor.value = '';
};

export const runAiAssist = async (query: string): Promise<void> => {
  const q = query.trim();
  if (!q) return;
  if (!llmEnabled.value && aiActiveFor.value !== q) return;
  if (pending === q) return;
  pending = q;

  aiStatus.value = 'loading';
  aiEntry.value = null;
  try {
    const generated = await generateEntry(q, setLlmProgress);
    if (pending !== q) return;
    llmReady.value = true;
    aiEntry.value = generated;
    aiStatus.value = generated ? 'done' : 'error';
  } catch (error) {
    console.warn('[AiAssist] generation failed:', error);
    if (pending === q) aiStatus.value = 'error';
  }
};

export const activatePageAi = (query: string): void => {
  const q = query.trim();
  if (!q) return;
  aiActiveFor.value = q;
  void runAiAssist(q);
};
