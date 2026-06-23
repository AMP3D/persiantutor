import { useEffect, useRef } from 'react';
import { common } from '../../state/common';
import Icon from '../Icon/Icon.tsx';
import {
  answer,
  autoFocus,
  deck,
  ensureDeck,
  flipped,
  handleInput,
  handleSubmit,
  index,
  next,
  prev,
  reshuffle,
  result,
  reveal,
  stopFlip,
  trackKeyboard,
} from './flashCards';
import './flashCards.scss';

const FlashCards = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cards = common.value;
  useEffect(() => {
    ensureDeck();
  }, [cards.length]);

  useEffect(() => trackKeyboard(), []);

  const entries = deck.value;
  const position = index.value;
  const card = entries[position];
  const showBack = flipped.value;
  const quizResult = result.value;

  useEffect(() => {
    if (card && autoFocus.value) inputRef.current?.focus({ preventScroll: true });
  }, [card]);

  if (!card) {
    return <p className="flash-cards__empty">Loading cards…</p>;
  }

  const informal = card.usages.filter((usage) => usage.register === 'informal');
  const formal = card.usages.filter((usage) => usage.register === 'formal');

  return (
    <div className="flash-cards">
      <div className="flash-cards__counter">
        {position + 1} / {entries.length}
      </div>

      <div
        className={showBack ? 'flash-cards__card flash-cards__card--flipped' : 'flash-cards__card'}
        onClick={reveal}
        role="button"
        tabIndex={0}
      >
        <div className="flash-cards__inner">
          <div className="flash-cards__face flash-cards__face--front">
            <span className="flash-cards__term">{card.term}</span>
            {card.farsi && <span className="flash-cards__farsi">{card.farsi}</span>}
            <form className="flash-cards__quiz" onClick={stopFlip} onSubmit={handleSubmit}>
              <input
                aria-label="Your answer"
                autoComplete="off"
                className="flash-cards__input"
                onChange={handleInput}
                placeholder="Type the meaning…"
                ref={inputRef}
                type="text"
                value={answer.value}
              />
              <button
                className="btn flash-cards__check"
                // disabled={!answer.value.trim()}
                type="submit"
              >
                Check
              </button>
            </form>
            <span className="flash-cards__hint">Tap to reveal, or type your answer</span>
          </div>

          <div className="flash-cards__face flash-cards__face--back">
            {quizResult && (
              <div className={`flash-cards__result flash-cards__result--${quizResult}`}>
                <Icon name={quizResult === 'correct' ? 'check' : 'x-mark'} />
                <span>{quizResult === 'correct' ? 'Correct' : 'Incorrect'}</span>
              </div>
            )}
            <span className="flash-cards__meaning">{card.meaning}</span>
            {informal.length > 0 && (
              <div className="flash-cards__usage-group">
                <span className="flash-cards__register">Informal</span>
                {informal.map((usage) => (
                  <p key={usage.finglish} className="flash-cards__usage">
                    {usage.finglish} — {usage.english}
                  </p>
                ))}
              </div>
            )}
            {formal.length > 0 && (
              <div className="flash-cards__usage-group">
                <span className="flash-cards__register">Formal</span>
                {formal.map((usage) => (
                  <p key={usage.finglish} className="flash-cards__usage">
                    {usage.finglish} — {usage.english}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flash-cards__controls">
        <button
          aria-label="Previous card"
          className="icon-btn"
          disabled={position <= 0}
          onClick={prev}
          type="button"
        >
          <Icon name="chevron-left" />
        </button>

        <button aria-label="Shuffle deck" className="icon-btn" onClick={reshuffle} type="button">
          <Icon name="arrow-path" />
        </button>

        <button
          aria-label="Next card"
          className="icon-btn"
          disabled={position >= entries.length - 1}
          onClick={next}
          type="button"
        >
          <Icon name="chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default FlashCards;
