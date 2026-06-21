import type { ChangeEvent } from 'react';
import { seedEntries } from '../../db/seed';
import { clearAll, exportBundle, importBundle } from '../../db/transfer';
import type { ExportBundle } from '../../models/Db';
import { resetAiAssist } from '../../state/aiAssist';
import { refreshCommon } from '../../state/common';
import { clearAiCache } from '../../state/llm';
import { refreshRecent } from '../../state/recent';
import { closeMenu, openConfirm } from '../../state/ui';

const refreshLists = (): Promise<unknown> => Promise.all([refreshRecent(), refreshCommon()]);

export const exportDb = async (): Promise<void> => {
  closeMenu();
  const bundle = await exportBundle();
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `persian-tutor-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const handleImportFile = (event: ChangeEvent<HTMLInputElement>): void => {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  closeMenu();
  openConfirm({
    title: 'Import backup?',
    message: `Replace all current data with the contents of "${file.name}".`,
    warning: 'Export your current data first if you might need it — this cannot be undone.',
    confirmLabel: 'Import',
    onConfirm: async () => {
      const bundle = JSON.parse(await file.text()) as ExportBundle;
      await importBundle(bundle);
      await refreshLists();
    },
  });
};

export const requestClear = (): void => {
  closeMenu();
  openConfirm({
    title: 'Clear all data?',
    message: 'Remove every entry and your full search history, then restore the starter words.',
    warning: 'Export your data first — this cannot be undone.',
    confirmLabel: 'Clear',
    onConfirm: async () => {
      await clearAll();
      await seedEntries();
      await refreshLists();
    },
  });
};

export const requestClearAiCache = (): void => {
  closeMenu();
  openConfirm({
    title: 'Clear AI cache?',
    message: 'Delete the downloaded on-device AI model from this browser to free up space.',
    warning: 'The AI Assistant will re-download the model (~450 MB) the next time you use it.',
    confirmLabel: 'Clear AI cache',
    onConfirm: async () => {
      resetAiAssist();
      await clearAiCache();
    },
  });
};
