import { normalize, normalizeAll } from '../engine/normalize';
import type { DictionaryEntry } from '../models/Entry';

export interface NumberEntry {
  numeral: string;
  farsi: string;
  finglish: string;
  value: number;
}

export const persianNumbers: NumberEntry[] = [
  { value: 0, numeral: '۰', farsi: 'صفر', finglish: 'sefr' },
  { value: 1, numeral: '۱', farsi: 'یک', finglish: 'yek' },
  { value: 2, numeral: '۲', farsi: 'دو', finglish: 'do' },
  { value: 3, numeral: '۳', farsi: 'سه', finglish: 'se' },
  { value: 4, numeral: '۴', farsi: 'چهار', finglish: 'chahār' },
  { value: 5, numeral: '۵', farsi: 'پنج', finglish: 'panj' },
  { value: 6, numeral: '۶', farsi: 'شش', finglish: 'shesh' },
  { value: 7, numeral: '۷', farsi: 'هفت', finglish: 'haft' },
  { value: 8, numeral: '۸', farsi: 'هشت', finglish: 'hasht' },
  { value: 9, numeral: '۹', farsi: 'نه', finglish: 'noh' },
  { value: 10, numeral: '۱۰', farsi: 'ده', finglish: 'dah' },
  { value: 11, numeral: '۱۱', farsi: 'یازده', finglish: 'yāzdah' },
  { value: 12, numeral: '۱۲', farsi: 'دوازده', finglish: 'davāzdah' },
  { value: 13, numeral: '۱۳', farsi: 'سیزده', finglish: 'sizdah' },
  { value: 14, numeral: '۱۴', farsi: 'چهارده', finglish: 'chahārdah' },
  { value: 15, numeral: '۱۵', farsi: 'پانزده', finglish: 'pānzdah' },
  { value: 16, numeral: '۱۶', farsi: 'شانزده', finglish: 'shānzdah' },
  { value: 17, numeral: '۱۷', farsi: 'هفده', finglish: 'hefdah' },
  { value: 18, numeral: '۱۸', farsi: 'هجده', finglish: 'hejdah' },
  { value: 19, numeral: '۱۹', farsi: 'نوزده', finglish: 'nuzdah' },
  { value: 20, numeral: '۲۰', farsi: 'بیست', finglish: 'bist' },
  { value: 30, numeral: '۳۰', farsi: 'سی', finglish: 'si' },
  { value: 40, numeral: '۴۰', farsi: 'چهل', finglish: 'chehel' },
  { value: 50, numeral: '۵۰', farsi: 'پنجاه', finglish: 'panjāh' },
  { value: 60, numeral: '۶۰', farsi: 'شصت', finglish: 'shast' },
  { value: 70, numeral: '۷۰', farsi: 'هفتاد', finglish: 'haftād' },
  { value: 80, numeral: '۸۰', farsi: 'هشتاد', finglish: 'hashtād' },
  { value: 90, numeral: '۹۰', farsi: 'نود', finglish: 'navad' },
  { value: 100, numeral: '۱۰۰', farsi: 'صد', finglish: 'sad' },
  { value: 200, numeral: '۲۰۰', farsi: 'دویست', finglish: 'devist' },
  { value: 500, numeral: '۵۰۰', farsi: 'پانصد', finglish: 'pānsad' },
  { value: 1000, numeral: '۱۰۰۰', farsi: 'هزار', finglish: 'hezār' },
];

/** Number cards for the flash-card "Numbers" set: prompt is the Persian word, answer is the value. */
export const numberEntries: DictionaryEntry[] = persianNumbers.map((entry) => ({
  term: entry.finglish,
  normalizedKey: normalize(entry.finglish),
  aliases: normalizeAll([entry.finglish]),
  meaning: String(entry.value),
  farsi: entry.farsi,
  usages: [],
  tags: ['number'],
  source: 'seed',
  createdAt: 0,
}));
