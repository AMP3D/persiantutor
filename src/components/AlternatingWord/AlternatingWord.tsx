import { type MouseEvent, useRef, useState } from 'react';
import {
  type LetterHint,
  type WordLetter,
  hintOffset,
  letterClass,
  wordLetters,
} from './alternatingWord';
import './alternatingWord.scss';

interface AlternatingWordProps {
  word: string;
}

/**
 * Paints every other letter in the plain text color, leaving the rest in whatever color the parent
 * sets — an easy way to see where each letter of a joined-up Persian word starts and ends. Only the
 * color changes between letters, so the script still shapes and joins normally. Tapping a Persian
 * letter names it in a bubble above the word; tapping it again (or the bubble) puts it away.
 */
const AlternatingWord = ({ word }: AlternatingWordProps) => {
  const [hint, setHint] = useState<LetterHint | null>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  // Moving on to the next card leaves the old card's hint behind rather than resetting it in an
  // effect: a hint that isn't for the word on screen is simply not drawn.
  const shown = hint?.word === word ? hint : null;

  const closeHint = (event: MouseEvent): void => {
    event.stopPropagation();
    setHint(null);
  };

  const toggleHint = (event: MouseEvent<HTMLSpanElement>, letter: WordLetter): void => {
    // Letters with no name of their own stay transparent to clicks, so tapping them still flips the
    // card the word sits on.
    if (!letter.name) {
      setHint(null);
      return;
    }
    event.stopPropagation();
    const x = hintOffset(event.currentTarget, wordRef.current);
    setHint(shown?.key === letter.key ? null : { key: letter.key, name: letter.name, word, x });
  };

  return (
    <span ref={wordRef} className="alternating-word">
      {wordLetters(word).map((letter) => (
        <span
          key={letter.key}
          className={letterClass(letter)}
          onClick={(event) => toggleHint(event, letter)}
        >
          {letter.text}
        </span>
      ))}
      {shown && (
        <span
          className="alternating-word__hint"
          onClick={closeHint}
          style={{ left: `${shown.x}px` }}
        >
          {shown.name}
        </span>
      )}
    </span>
  );
};

export default AlternatingWord;
