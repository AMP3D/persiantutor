import { type LetterEntry, persianAlphabet } from '../../data/alphabet';

export interface LetterHint {
  /** Key of the letter the hint belongs to, so tapping the same letter again closes it. */
  key: string;
  name: string;
  /** The word it was opened on — a hint for any other word is stale and simply isn't drawn. */
  word: string;
  x: number;
}

export interface WordLetter {
  key: string;
  /** Alphabet name of the letter ('Alef'), empty when it isn't a Persian letter. */
  name: string;
  /** True for the 1st, 3rd, 5th… letter — the ones painted in the theme's plain text color. */
  plain: boolean;
  text: string;
}

/** Arabic-script spellings that appear in Persian text but aren't listed as letters of their own. */
const LETTER_ALIASES: Record<string, string> = {
  آ: 'ا',
  أ: 'ا',
  إ: 'ا',
  ٱ: 'ا',
  ة: 'ه',
  ك: 'ک',
  ى: 'ی',
  ي: 'ی',
  ؤ: 'و',
  ئ: 'ی',
};

const byCharacter = new Map<string, LetterEntry>(
  persianAlphabet.map((entry) => [entry.isolated, entry]),
);

const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

/** Letter name for a grapheme, ignoring any diacritics riding along with it. */
const letterName = (segment: string): string => {
  const base = segment.trim().charAt(0);
  return byCharacter.get(LETTER_ALIASES[base] ?? base)?.name ?? '';
};

/** Outlined letter, every other one in the alternate color — the gaps between words stay bare. */
export const letterClass = (letter: WordLetter): string | undefined => {
  if (!letter.text.trim()) return undefined;

  return letter.plain
    ? 'alternating-word__letter alternating-word__letter--plain'
    : 'alternating-word__letter';
};

/** Distance from the word's left edge to the middle of a letter, so its hint can sit right above it. */
export const hintOffset = (letter: HTMLElement, word: HTMLElement | null): number => {
  if (!word) return 0;
  const letterBox = letter.getBoundingClientRect();

  return letterBox.left + letterBox.width / 2 - word.getBoundingClientRect().left;
};

/**
 * Split a word into letters that alternate color, starting plain. Grapheme segmentation keeps
 * combining marks (Persian diacritics, accented Finglish vowels) attached to the letter they belong
 * to, and whitespace never takes a turn so multi-word terms keep alternating across the gap.
 */
export const wordLetters = (word: string): WordLetter[] => {
  let position = 0;

  return [...segmenter.segment(word)].map(({ index, segment }) => {
    if (!segment.trim()) {
      return { key: String(index), name: '', plain: false, text: segment };
    }
    const plain = position % 2 === 0;
    position += 1;

    return { key: String(index), name: letterName(segment), plain, text: segment };
  });
};
