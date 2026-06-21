import { signal } from '@preact/signals-react';
import { activatePageAi } from '../../state/aiAssist';
import { disableAi, llmReady, prepareModel, setLlmEnabled } from '../../state/llm';

export const aiModalOpen = signal(false);

let pendingAction: (() => void) | null = null;

export const closeAiModal = (): void => {
  aiModalOpen.value = false;
  pendingAction = null;
};

const runWhenReady = (action: () => void): void => {
  if (llmReady.value) {
    action();
    return;
  }
  pendingAction = action;
  aiModalOpen.value = true;
};

export const confirmAiDownload = async (): Promise<void> => {
  const ready = await prepareModel();
  if (!ready) return; // modal stays open and shows the error state
  pendingAction?.();
  pendingAction = null;
  aiModalOpen.value = false;
};

// Menu bar: global on/off toggle.
export const requestEnableAi = (currentlyEnabled: boolean): void => {
  if (currentlyEnabled) {
    disableAi();
    return;
  }
  runWhenReady(() => setLlmEnabled(true));
};

// "Show AI Assistant" on a definition page: enable AI for that word only.
export const requestPageAi = (query: string): void => {
  runWhenReady(() => activatePageAi(query));
};
