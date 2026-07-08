import { normalize, normalizeAll } from '../engine/normalize';
import type { DictionaryEntry } from '../models/Entry';

export interface CalendarItem {
  finglish: string;
  farsi: string;
  /** English gloss — the day name, or "Nth month — Gregorian span" — used for display and grading. */
  english: string;
  aliases?: string[];
}

/**
 * Persian weekdays and the twelve Jalali (solar) calendar months. Shared by the "Days / Months" page
 * and the flash-card "Days & months" set. Weekdays answer with the English day; months answer with the
 * Gregorian span they cover (or the "Nth month" ordinal), so a guess like "March" resolves Farvardin.
 */
export const weekdays: CalendarItem[] = [
  { finglish: 'shanbe', farsi: 'شنبه', english: 'Saturday' },
  { finglish: 'yekshanbe', farsi: 'یکشنبه', english: 'Sunday', aliases: ['yek shanbe'] },
  { finglish: 'doshanbe', farsi: 'دوشنبه', english: 'Monday', aliases: ['do shanbe'] },
  { finglish: 'seshanbe', farsi: 'سه شنبه', english: 'Tuesday', aliases: ['se shanbe'] },
  { finglish: 'chaharshanbe', farsi: 'چهارشنبه', english: 'Wednesday', aliases: ['chahar shanbe'] },
  { finglish: 'panjshanbe', farsi: 'پنج شنبه', english: 'Thursday', aliases: ['panj shanbe'] },
  { finglish: 'jome', farsi: 'جمعه', english: 'Friday', aliases: ['jomeh'] },
];

export const months: CalendarItem[] = [
  { finglish: 'farvardin', farsi: 'فروردین', english: '1st month — March/April' },
  { finglish: 'ordibehesht', farsi: 'اردیبهشت', english: '2nd month — April/May' },
  { finglish: 'khordad', farsi: 'خرداد', english: '3rd month — May/June' },
  { finglish: 'tir', farsi: 'تیر', english: '4th month — June/July' },
  { finglish: 'mordad', farsi: 'مرداد', english: '5th month — July/August' },
  { finglish: 'shahrivar', farsi: 'شهریور', english: '6th month — August/September' },
  { finglish: 'mehr', farsi: 'مهر', english: '7th month — September/October' },
  { finglish: 'aban', farsi: 'آبان', english: '8th month — October/November' },
  { finglish: 'azar', farsi: 'آذر', english: '9th month — November/December' },
  { finglish: 'dey', farsi: 'دی', english: '10th month — December/January' },
  { finglish: 'bahman', farsi: 'بهمن', english: '11th month — January/February' },
  { finglish: 'esfand', farsi: 'اسفند', english: '12th month — February/March' },
];

const toEntry = (item: CalendarItem): DictionaryEntry => ({
  term: item.finglish,
  normalizedKey: normalize(item.finglish),
  aliases: normalizeAll([item.finglish, ...(item.aliases ?? [])]),
  meaning: item.english,
  farsi: item.farsi,
  usages: [],
  tags: ['noun'],
  source: 'seed',
  createdAt: 0,
});

export const calendarEntries: DictionaryEntry[] = [...weekdays, ...months].map(toEntry);
