import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon.tsx';
import {
  modeOptions,
  placeholderFor,
  query,
  searchMode,
  setSearchMode,
  submitQuery,
} from './searchBox';
import './searchBox.scss';

const SearchBox = () => {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    submitQuery(navigate);
  };

  return (
    <div className="search-box-wrap">
      <form className="search-box" onSubmit={onSubmit} role="search">
        <Icon name="magnifying-glass" />
        <input
          className="search-box__input"
          type="text"
          value={query.value}
          onChange={(event) => (query.value = event.target.value)}
          placeholder={placeholderFor(searchMode.value)}
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
      <div className="search-box__modes" role="radiogroup" aria-label="Search language">
        {modeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={searchMode.value === option.value}
            className={
              searchMode.value === option.value
                ? 'search-box__mode search-box__mode--active'
                : 'search-box__mode'
            }
            onClick={() => setSearchMode(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
