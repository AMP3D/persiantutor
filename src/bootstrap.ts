import { seedEntries } from './db/seed';
import { refreshCommon } from './state/common';
import { ensureDictionary } from './state/dictionary';
import { initLlm } from './state/llm';
import { refreshRecent } from './state/recent';
import { initTheme } from './state/theme';

export const bootstrap = async (): Promise<void> => {
  await initTheme();
  await Promise.all([initLlm(), seedEntries()]);
  await Promise.all([refreshRecent(), refreshCommon()]);
  // Load the full dictionary in the background; the modal drives its own UI.
  void ensureDictionary();
};
