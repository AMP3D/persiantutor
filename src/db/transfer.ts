import { invalidateFuzzy } from '../engine/fuzzy';
import { DB_VERSION, EXPORT_APP_ID, type ExportBundle } from '../models/Db';
import { db } from './db';

export const clearAll = async (): Promise<void> => {
  await db.transaction('rw', db.entries, db.searches, db.settings, async () => {
    await Promise.all([db.entries.clear(), db.searches.clear(), db.settings.clear()]);
  });
  invalidateFuzzy();
};

export const exportBundle = async (): Promise<ExportBundle> => {
  const [entries, searches, settings] = await Promise.all([
    // The bundled dictionary is reloadable, so keep it out of backups.
    db.entries.where('source').notEqual('dict').toArray(),
    db.searches.toArray(),
    db.settings.toArray(),
  ]);
  return {
    app: EXPORT_APP_ID,
    version: DB_VERSION,
    exportedAt: Date.now(),
    entries,
    searches,
    settings,
  };
};

export const importBundle = async (bundle: ExportBundle): Promise<void> => {
  if (bundle?.app !== EXPORT_APP_ID) {
    throw new Error('This file is not a Persian Tutor backup.');
  }
  await db.transaction('rw', db.entries, db.searches, db.settings, async () => {
    await Promise.all([db.entries.clear(), db.searches.clear(), db.settings.clear()]);
    await Promise.all([
      db.entries.bulkAdd(bundle.entries ?? []),
      db.searches.bulkAdd(bundle.searches ?? []),
      db.settings.bulkPut(bundle.settings ?? []),
    ]);
  });
  invalidateFuzzy();
};
