import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon.tsx';
import { query, submitQuery } from './searchBox';
import './searchBox.scss';

const SearchBox = () => {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    submitQuery(navigate);
  };

  return (
    <form className="search-box" onSubmit={onSubmit} role="search">
      <Icon name="magnifying-glass" />
      <input
        className="search-box__input"
        type="text"
        value={query.value}
        onChange={(event) => (query.value = event.target.value)}
        placeholder="Type Finglish, e.g. khubam"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="search"
      />
      {query.value && (
        <button
          type="button"
          className="icon-btn search-box__clear"
          aria-label="Clear"
          onClick={() => (query.value = '')}
        >
          <Icon name="x-mark" />
        </button>
      )}
    </form>
  );
};

export default SearchBox;
