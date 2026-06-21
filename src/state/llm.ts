import { signal } from '@preact/signals-react';
import { getSetting, setSetting } from '../db/settings';
import { loadModel, resetModel } from '../engine/llm';
import type { LlmProgress } from '../models/Llm';
import { SettingKeys } from '../models/Settings';

export const llmEnabled = signal(false);

export const llmReady = signal(false);

export const llmProgress = signal<LlmProgress>({
  status: 'idle',
  loaded: 0,
  total: 0,
  message: '',
});

export const initLlm = async (): Promise<void> => {
  llmEnabled.value = (await getSetting<boolean>(SettingKeys.LlmEnabled)) ?? false;
};

export const setLlmEnabled = (value: boolean): void => {
  llmEnabled.value = value;
  void setSetting(SettingKeys.LlmEnabled, value);
};

export const setLlmProgress = (progress: LlmProgress): void => {
  llmProgress.value = progress;
};

// Download + load the model into memory. Does NOT change the global on/off setting,
// so it can back both the global toggle and per-page activation.
export const prepareModel = async (): Promise<boolean> => {
  setLlmProgress({ status: 'loading', loaded: 0, total: 0, message: 'Starting…' });
  try {
    await loadModel(setLlmProgress);
    llmReady.value = true;
    setLlmProgress({ status: 'ready', loaded: 1, total: 1, message: 'Ready' });
    return true;
  } catch (error) {
    llmReady.value = false;
    setLlmProgress({ status: 'error', loaded: 0, total: 0, message: String(error) });
    return false;
  }
};

export const disableAi = (): void => {
  setLlmEnabled(false);
  setLlmProgress({ status: 'idle', loaded: 0, total: 0, message: '' });
};

// Delete the cached model files (Cache API) and drop it from memory. The PWA app
// cache is left untouched; only transformers.js entries are removed.
export const clearAiCache = async (): Promise<void> => {
  resetModel();
  llmReady.value = false;
  setLlmEnabled(false);
  setLlmProgress({ status: 'idle', loaded: 0, total: 0, message: '' });
  if (typeof caches === 'undefined') return;
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((key) => key.toLowerCase().includes('transformers'))
      .map((key) => caches.delete(key)),
  );
};
