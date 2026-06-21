import type { UserSetting } from '../models/Settings';
import { db } from './db';

export const getSetting = async <T>(key: string): Promise<T | undefined> => {
  const row = (await db.settings.get(key)) as UserSetting<T> | undefined;
  return row?.value;
};

export const setSetting = async <T>(key: string, value: T): Promise<void> => {
  await db.settings.put({ key, value });
};
