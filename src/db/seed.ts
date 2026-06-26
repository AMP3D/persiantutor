import { commonWords } from '../data/commonWords';
import { invalidateEnglishFuse } from '../engine/english';
import { invalidateFuzzy } from '../engine/fuzzy';
import { normalize, normalizeAll } from '../engine/normalize';
import type { DictionaryEntry, SeedEntry } from '../models/Entry';
import { db } from './db';

const toEntry = (seed: SeedEntry): DictionaryEntry => ({
  term: seed.term,
  normalizedKey: normalize(seed.term),
  aliases: normalizeAll([seed.term, ...(seed.aliases ?? [])]),
  meaning: seed.meaning,
  farsi: seed.farsi,
  usages: seed.usages,
  tags: seed.tags ?? [],
  note: seed.note,
  source: 'seed',
  createdAt: Date.now(),
});

export const seedEntries = async (): Promise<void> => {
  await db.transaction('rw', db.entries, async () => {
    const existing = await db.entries.where('source').equals('seed').toArray();
    const idByKey = new Map(existing.map((entry) => [entry.normalizedKey, entry.id]));
    const rows = commonWords.map(toEntry).map((entry) => {
      const id = idByKey.get(entry.normalizedKey);
      return id ? { ...entry, id } : entry;
    });
    await db.entries.bulkPut(rows);
  });
  invalidateFuzzy();
  invalidateEnglishFuse();
};
