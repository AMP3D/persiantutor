import { DB_VERSION, EXPORT_APP_ID, type ExportBundle } from '../models/Db';
import { db } from './db';

export const clearAll = (): Promise<void> =>
  db.transaction('rw', db.entries, db.searches, db.settings, async () => {
    await Promise.all([db.entries.clear(), db.searches.clear(), db.settings.clear()]);
  });

export const exportBundle = async (): Promise<ExportBundle> => {
  const [entries, searches, settings] = await Promise.all([
    db.entries.toArray(),
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

export const importBundle = (bundle: ExportBundle): Promise<void> => {
  if (bundle?.app !== EXPORT_APP_ID) {
    throw new Error('This file is not a Persian Tutor backup.');
  }
  return db.transaction('rw', db.entries, db.searches, db.settings, async () => {
    await Promise.all([db.entries.clear(), db.searches.clear(), db.settings.clear()]);
    await Promise.all([
      db.entries.bulkAdd(bundle.entries ?? []),
      db.searches.bulkAdd(bundle.searches ?? []),
      db.settings.bulkPut(bundle.settings ?? []),
    ]);
  });
};
