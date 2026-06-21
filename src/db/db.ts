import Dexie, { type EntityTable } from 'dexie';
import { DB_NAME, DB_VERSION, Tables } from '../models/Db';
import type { DictionaryEntry } from '../models/Entry';
import type { SearchRecord } from '../models/Search';
import type { UserSetting } from '../models/Settings';

export const db = new Dexie(DB_NAME) as Dexie & {
  entries: EntityTable<DictionaryEntry, 'id'>;
  searches: EntityTable<SearchRecord, 'id'>;
  settings: EntityTable<UserSetting, 'key'>;
};

db.version(DB_VERSION).stores({
  [Tables.Entries]: '++id, normalizedKey, term, source, *aliases',
  [Tables.Searches]: '++id, normalizedKey, at, resolved',
  [Tables.Settings]: 'key',
});
