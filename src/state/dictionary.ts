import { signal } from '@preact/signals-react';
import { addDictEntries, clearDictEntries, dictCount } from '../db/entries';
import { getSetting, setSetting } from '../db/settings';
import { normalize } from '../engine/normalize';
import type { DictionaryEntry, EntryTag } from '../models/Entry';
import { SettingKeys } from '../models/Settings';

// Bump when public/dictionary.json changes to force a one-time reload.
const DICT_VERSION = 2;
const CHUNK = 2000;

// Compact tuple shape from public/dictionary.json: [term, farsi, meaning, pos, aliasKeys?].
type DictTuple = [string, string, string, string, string[]?];

// Wiktionary part-of-speech → display tag (matches the seed entries' tag chips).
const POS_TAG: Record<string, EntryTag> = {
  noun: 'noun',
  name: 'noun',
  verb: 'verb',
  adj: 'adjective',
  adv: 'adverb',
  num: 'number',
  pron: 'pronoun',
  intj: 'interjection',
  conj: 'conjunction',
  prep: 'preposition',
  particle: 'particle',
  det: 'determiner',
  phrase: 'phrase',
};

export type DictStatus = 'idle' | 'loading' | 'ready' | 'error';

export const dictStatus = signal<DictStatus>('idle');

export const dictProgress = signal({ loaded: 0, total: 0 });

const toEntry = (tuple: DictTuple, createdAt: number): DictionaryEntry => {
  const [term, farsi, meaning, pos, aliasKeys] = tuple;
  const tag = POS_TAG[pos];
  return {
    term,
    farsi,
    meaning,
    normalizedKey: normalize(term),
    aliases: [...new Set([normalize(term), ...(aliasKeys ?? [])])],
    usages: [],
    tags: tag ? [tag] : [],
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
