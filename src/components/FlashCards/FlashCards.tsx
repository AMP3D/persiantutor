import { useEffect, useRef } from 'react';
import { common } from '../../state/common';
import AlternatingWord from '../AlternatingWord/AlternatingWord.tsx';
import Icon from '../Icon/Icon.tsx';
import {
  answer,
  autoFocus,
  cardPhrases,
  clearGroup,
  closeSet,
  deck,
  ensureDeck,
  flipped,
  groupSize,
  groupSizeOptions,
  handleInput,
  handleSizeChange,
  handleSubmit,
  hasProgress,
  index,
  next,
  openSet,
  prev,
  resetAllSets,
  reshuffle,
  result,
  reveal,
  setTiles,
  showFinglish,
  showPhrases,
  showTerm,
  stats,
  stopFlip,
  studying,
  toggleFinglish,
  togglePhrases,
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
  const size = groupSize.value;
  const inSet = studying.value;
  const tiles = setTiles();
  const active = stats();

  useEffect(() => {
    if (card && autoFocus.value) inputRef.current?.focus({ preventScroll: true });
  }, [card]);

  if (tiles.length === 0) {
    return <p className="flash-cards__empty">Loading cards…</p>;
  }

  if (!inSet) {
    return (
      <div className="flash-cards">
        <div className="flash-cards__setup">
          <div className="flash-cards__setup-bar">
            <label className="flash-cards__select">
              <span>Words per group</span>
              <select onChange={handleSizeChange} value={String(size)}>
                {groupSizeOptions.map((option) => (
                  <option key={String(option)} value={String(option)}>
                    {option === 'all' ? 'All' : option}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="flash-cards__reset-all"
              disabled={!hasProgress()}
              onClick={resetAllSets}
              type="button"
            >
              <Icon name="trash" />
              Reset all
            </button>
          </div>

          <div className="flash-cards__sets">
            {tiles.map((tile) => (
              <div key={tile.id} className="flash-cards__set">
                <button
                  className={
                    tile.complete
                      ? 'flash-cards__set-square flash-cards__set-square--done'
                      : 'flash-cards__set-square'
                  }
                  onClick={() => openSet(tile.id)}
                  type="button"
                >
                  <span className="flash-cards__set-title">{tile.title}</span>
                  {tile.hint && <span className="flash-cards__set-hint">{tile.hint}</span>}
                </button>
                <span className="flash-cards__set-progress">
                  {tile.done} / {tile.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const informal = card?.usages.filter((usage) => usage.register === 'informal') ?? [];
  const formal = card?.usages.filter((usage) => usage.register === 'formal') ?? [];
  const finglish = showFinglish.value;
  const phrasesOn = showPhrases.value;
  const phrases = card ? cardPhrases(card) : [];
  const termVisible = card ? showTerm(card) : false;

  return (
    <div className="flash-cards">
      <div className="flash-cards__bar">
        <button className="flash-cards__back" onClick={closeSet} type="button">
          <Icon name="chevron-left" />
          Sets
        </button>
        <span className="flash-cards__bar-title">
          {active.title}
          {active.hint && <span className="flash-cards__bar-hint"> · {active.hint}</span>}
        </span>
      </div>

      <div className="flash-cards__progress">
        <span>
          {active.done} / {active.total} learned
        </span>
        <button
          className="flash-cards__clear"
          disabled={active.done === 0}
          onClick={clearGroup}
          type="button"
        >
          <Icon name="trash" />
          Reset
        </button>
      </div>

      <div aria-label="Card display" className="flash-cards__options" role="group">
        <button
          aria-pressed={finglish}
          className={
            finglish ? 'flash-cards__toggle flash-cards__toggle--on' : 'flash-cards__toggle'
          }
          onClick={toggleFinglish}
          type="button"
        >
          Finglish
        </button>

        {finglish && (
          <button
            aria-pressed={phrasesOn}
            className={
              phrasesOn ? 'flash-cards__toggle flash-cards__toggle--on' : 'flash-cards__toggle'
            }
            disabled={!finglish}
            onClick={togglePhrases}
            type="button"
          >
            Phrases
          </button>
        )}
      </div>

      {card ? (
        <>
          <div className="flash-cards__counter">
            {position + 1} / {entries.length}
          </div>

          <div
            className={
              showBack ? 'flash-cards__card flash-cards__card--flipped' : 'flash-cards__card'
            }
            onClick={reveal}
            role="button"
            tabIndex={0}
          >
            <div className="flash-cards__inner">
              <div className="flash-cards__face flash-cards__face--front">
                {termVisible && <span className="flash-cards__term">{card.term}</span>}
                {card.farsi && (
                  <span
                    className={
                      termVisible
                        ? 'flash-cards__farsi'
                        : 'flash-cards__farsi flash-cards__farsi--lead'
                    }
                  >
                    <AlternatingWord word={card.farsi} />
                  </span>
                )}
                {phrases.length > 0 && (
                  <div className="flash-cards__phrases">
                    {phrases.map((phrase) => (
                      <p key={phrase} className="flash-cards__phrase">
                        {phrase}
                      </p>
                    ))}
                  </div>
                )}
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
                  <button className="btn flash-cards__check" type="submit">
                    Check
                  </button>
                </form>
                <span className="flash-cards__hint">
                  Tap a letter to reveal the meaning. Tap the card to reveal the answer or type your
                  answer in to check your answer.
                </span>
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
        </>
      ) : (
        <div className="flash-cards__done">
          <Icon name="check" />
          <p className="flash-cards__done-title">Set complete!</p>
          <p className="flash-cards__done-sub">You answered all {active.total} correctly.</p>
          <button className="btn" onClick={clearGroup} type="button">
            Study again
          </button>
        </div>
      )}

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
