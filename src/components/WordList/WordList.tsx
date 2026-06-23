import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon.tsx';
import { buildScrollClass } from './wordList';
import type { ScrollMode, WordListItem } from './wordList';
import './wordList.scss';

interface WordListProps {
  title: string;
  emptyText: string;
  items: WordListItem[];
  toolbar?: ReactNode;
  headerAction?: ReactNode;
  scrollMode?: ScrollMode;
}

const WordList = ({
  title,
  emptyText,
  items,
  toolbar,
  headerAction,
  scrollMode,
}: WordListProps) => (
  <section className={scrollMode === 'flex' ? 'word-list word-list--fill' : 'word-list'}>
    <header className="word-list__header">
      <h2 className="word-list__title">{title}</h2>
      {headerAction}
    </header>
    {toolbar}
    {items.length === 0 ? (
      <p className="word-list__empty">{emptyText}</p>
    ) : (
      <ul className={buildScrollClass(scrollMode)}>
        {items.map((item) => (
          <li key={item.key} className="word-list__item">
            <Link className="word-list__link" to={item.path}>
              <span className="word-list__term">{item.term}</span>
              <span className="word-list__subtitle">{item.subtitle}</span>
              <Icon name="chevron-right" />
            </Link>
            {item.onRemove ? (
              <button
                type="button"
                className="word-list__remove"
                aria-label={`Remove ${item.term}`}
                onClick={item.onRemove}
              >
                <Icon name="x-mark" />
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default WordList;
