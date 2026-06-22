export type EntrySource = 'seed' | 'llm' | 'user' | 'dict';

export type EntryTag =
  | 'adjective'
  | 'adverb'
  | 'conjunction'
  | 'determiner'
  | 'greeting'
  | 'interjection'
  | 'noun'
  | 'number'
  | 'offensive'
  | 'particle'
  | 'phrase'
  | 'preposition'
  | 'pronoun'
  | 'slang'
  | 'verb'
  | 'vulgar';

export type Register = 'formal' | 'informal';

export interface Usage {
  register: Register;
  finglish: string;
  english: string;
  farsi?: string;
}

export interface DictionaryEntry {
  id?: number;
  term: string;
  normalizedKey: string;
  aliases: string[];
  meaning: string;
  farsi?: string;
  usages: Usage[];
  tags: EntryTag[];
  note?: string;
  source: EntrySource;
  createdAt: number;
}

export interface SeedEntry {
  term: string;
  meaning: string;
  farsi?: string;
  usages: Usage[];
  aliases?: string[];
  tags?: EntryTag[];
  note?: string;
}
