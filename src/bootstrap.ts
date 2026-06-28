import { seedEntries } from './db/seed';
import { refreshCommon } from './state/common';
import { ensureDictionary } from './state/dictionary';
import { ensureFrequency } from './state/frequency';
import { ensureSenses } from './state/senses';
import { initLlm } from './state/llm';
import { refreshRecent } from './state/recent';
import { initTheme } from './state/theme';

export const bootstrap = async (): Promise<void> => {
  await initTheme();
  await Promise.all([initLlm(), seedEntries()]);
  await Promise.all([refreshRecent(), refreshCommon()]);
  // Load the full dictionary (modal-driven UI), the frequency list, and the
  // English sense overlay in the background; all are precached for offline use.
  void ensureDictionary();
  void ensureFrequency();
  void ensureSenses();
};
