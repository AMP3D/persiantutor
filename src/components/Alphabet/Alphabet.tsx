import { alphabetMode, letterForms, persianAlphabet, setAlphabetMode } from './alphabet';
import './alphabet.scss';

const Alphabet = () => {
  const mode = alphabetMode.value;

  return (
    <div className="alphabet">
      <div className="alphabet__head">
        <h2 className="alphabet__heading">Persian Alphabet</h2>
        <div className="alphabet__modes" role="group" aria-label="Layout">
          <button
            type="button"
            className={
              mode === 'cards'
                ? 'alphabet__mode-btn alphabet__mode-btn--active'
                : 'alphabet__mode-btn'
            }
            aria-pressed={mode === 'cards'}
            onClick={() => setAlphabetMode('cards')}
          >
            Detailed
          </button>
          <button
            type="button"
            className={
              mode === 'grid'
                ? 'alphabet__mode-btn alphabet__mode-btn--active'
                : 'alphabet__mode-btn'
            }
            aria-pressed={mode === 'grid'}
            onClick={() => setAlphabetMode('grid')}
          >
            Compact
          </button>
        </div>
      </div>

      <p className="alphabet__intro">
        32 letters that change shape by position. Use <strong>Detailed</strong> for every form, or{' '}
        <strong>Compact</strong> to scan all the letters at once.
      </p>

      {mode === 'cards' ? (
        <div className="alphabet__grid">
          {persianAlphabet.map((letter) => (
            <div key={letter.name} className="alphabet__card">
              <div className="alphabet__card-head">
                <span className="alphabet__name">{letter.name}</span>
                <span className="alphabet__sound">{letter.sound}</span>
              </div>
              <div className="alphabet__forms">
                {letterForms.map((form) => (
                  <div key={form.key} className="alphabet__form">
                    <span className="alphabet__char">{letter[form.key]}</span>
                    <span className="alphabet__form-label">{form.label}</span>
                  </div>
                ))}
              </div>
              <div className="alphabet__example">e.g. {letter.example}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alphabet__compact">
          {persianAlphabet.map((letter) => (
            <div key={letter.name} className="alphabet__tile">
              <span className="alphabet__tile-char">{letter.isolated}</span>
              <span className="alphabet__tile-name">{letter.name}</span>
              <span className="alphabet__tile-sound">{letter.sound}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alphabet;
