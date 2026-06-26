import type { Usage } from '../../models/Entry';
import { result, status } from '../../state/search';
import CopyButton from '../CopyButton/CopyButton.tsx';
import { buildResultView } from './resultCard';
import './resultCard.scss';

const FarsiLine = ({ text }: { text: string }) => (
  <div className="result-card__farsi-row">
    <span className="result-card__farsi-text">{text}</span>
    <CopyButton text={text} />
  </div>
);

const UsageGroup = ({ label, usages }: { label: string; usages: Usage[] }) => {
  if (usages.length === 0) return null;
  return (
    <div className="result-card__usage-group">
      <h4 className="result-card__usage-label">{label}</h4>
      {usages.map((usage) => (
        <div key={usage.finglish} className="result-card__usage">
          <span className="result-card__usage-fa">{usage.finglish}</span>
          <span className="result-card__usage-en">{usage.english}</span>
          {usage.farsi && <FarsiLine text={usage.farsi} />}
        </div>
      ))}
    </div>
  );
};

const ResultCard = () => {
  if (status.value === 'searching') {
    return <p className="result-card__status">Looking it up…</p>;
  }

  const view = result.value ? buildResultView(result.value) : null;

  if (!view) {
    const missing = result.value?.query ?? '';
    return (
      <div className="result-card result-card--empty">
        <p>
          No match found for <strong>{missing}</strong>. Try the AI assistant below.
        </p>
      </div>
    );
  }

  return (
    <article className="result-card">
      {view.approximate && (
        <p className="result-card__approx">
          {view.stage === 'derived'
            ? `Dictionary form of "${view.query}":`
            : 'Closest match — did you mean:'}
        </p>
      )}

      <header className="result-card__head">
        <h3 className="result-card__term">{view.corrected}</h3>
        {view.tags.length > 0 && (
          <ul className="result-card__tags">
            {view.tags.map((tag) => (
              <li key={tag} className="result-card__tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="result-card__meaning-block">
        <p className="result-card__meaning">{view.meaning}</p>
        {view.farsi && <FarsiLine text={view.farsi} />}
      </div>

      <UsageGroup label="Informal" usages={view.informal} />
      <UsageGroup label="Spoken (mohaverei - colloquial)" usages={view.spoken} />
      <UsageGroup label="Formal (ketabi - literary)" usages={view.formal} />

      {view.note && <p className="result-card__note">{view.note}</p>}
    </article>
  );
};

export default ResultCard;
