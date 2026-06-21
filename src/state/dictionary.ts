import { signal } from '@preact/signals-react';
import { addDictEntries, clearDictEntries, dictCount } from '../db/entries';
import { getSetting, setSetting } from '../db/settings';
import { normalize } from '../engine/normalize';
import type { DictionaryEntry } from '../models/Entry';
import { SettingKeys } from '../models/Settings';

// Bump when public/dictionary.json changes to force a one-time reload.
const DICT_VERSION = 1;
const CHUNK = 2000;

// Compact tuple shape from public/dictionary.json: [term, farsi, meaning, aliasKeys?].
type DictTuple = [string, string, string, string[]?];

export type DictStatus = 'idle' | 'loading' | 'ready' | 'error';

export const dictStatus = signal<DictStatus>('idle');

export const dictProgress = signal({ loaded: 0, total: 0 });

const toEntry = (tuple: DictTuple, createdAt: number): DictionaryEntry => {
  const [term, farsi, meaning, aliasKeys] = tuple;
  return {
    term,
    farsi,
    meaning,
    normalizedKey: normalize(term),
    aliases: [...new Set([normalize(term), ...(aliasKeys ?? [])])],
    usages: [],
    tags: [],
    source: 'dict',
    createdAt,
  };
};

export const ensureDictionary = async (): Promise<void> => {
  const version = await getSetting<number>(SettingKeys.DictVersion);
  if (version === DICT_VERSION && (await dictCount()) > 0) {
    dictStatus.value = 'ready';
    return;
  }

  dictStatus.value = 'loading';
  dictProgress.value = { loaded: 0, total: 0 };
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}dictionary.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const tuples = (await response.json()) as DictTuple[];

    await clearDictEntries();
    const now = Date.now();
    const rows = tuples.map((tuple) => toEntry(tuple, now));
    dictProgress.value = { loaded: 0, total: rows.length };
    for (let i = 0; i < rows.length; i += CHUNK) {
      await addDictEntries(rows.slice(i, i + CHUNK));
      dictProgress.value = { loaded: Math.min(i + CHUNK, rows.length), total: rows.length };
    }

    await setSetting(SettingKeys.DictVersion, DICT_VERSION);
    dictStatus.value = 'ready';
  } catch (error) {
    console.error('[dict] failed to load dictionary:', error);
    dictStatus.value = 'error';
  }
};
