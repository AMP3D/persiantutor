import { useParams, useSearchParams } from 'react-router-dom';
import AiAssist from '../AiAssist/AiAssist.tsx';
import ResultCard from '../ResultCard/ResultCard.tsx';
import { useWordView } from './wordView';
import './wordView.scss';

const WordView = () => {
  const { term } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('lang') === 'en' ? 'english' : 'finglish';
  useWordView(term, mode);
  const word = term ? decodeURIComponent(term) : '';

  return (
    <div className="word-view">
      <ResultCard />
      {word && <AiAssist word={word} />}
    </div>
  );
};

export default WordView;
