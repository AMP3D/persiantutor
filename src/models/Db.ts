import type { DictionaryEntry } from './Entry';
import type { SearchRecord } from './Search';
import type { UserSetting } from './Settings';

export const DB_NAME = 'persian-tutor';

export const DB_VERSION = 1;

export const Tables = {
  Entries: 'entries',
  Searches: 'searches',
  Settings: 'settings',
} as const;

export const EXPORT_APP_ID = 'persian-tutor';

export interface ExportBundle {
  app: typeof EXPORT_APP_ID;
  version: number;
  exportedAt: number;
  entries: DictionaryEntry[];
  searches: SearchRecord[];
  settings: UserSetting[];
}
