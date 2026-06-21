export type EntrySource = 'seed' | 'llm' | 'user' | 'dict';

export type EntryTag =
  | 'adjective'
  | 'greeting'
  | 'noun'
  | 'offensive'
  | 'phrase'
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
