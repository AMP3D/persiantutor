import Icon from '../Icon/Icon.tsx';
import WordList from '../WordList/WordList.tsx';
import {
  commonFilters,
  commonGroup,
  commonItems,
  recentItems,
  requestClearRecent,
  setCommonGroup,
} from './home';
import './home.scss';

const Home = () => {
  const recent = recentItems();
  const common = commonItems();

  const filter = (
    <div className="home__filter" role="group" aria-label="Filter common words by letter">
      {commonFilters.map((label) => (
        <button
          key={label}
          type="button"
          className={
            label === commonGroup.value
              ? 'home__filter-btn home__filter-btn--active'
              : 'home__filter-btn'
          }
          aria-pressed={label === commonGroup.value}
          onClick={() => setCommonGroup(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const clearRecent =
    recent.length > 0 ? (
      <button type="button" className="home__clear" onClick={requestClearRecent}>
        <Icon name="trash" />
        Clear
      </button>
    ) : undefined;

  return (
    <div className="home">
      <WordList
        emptyText="Your recent lookups will appear here."
        items={recent}
        scrollMode="capped"
        title="Recent"
        headerAction={clearRecent}
      />

      <WordList
        emptyText="No words in this range."
        items={common}
        scrollMode="flex"
        title="Common words"
        toolbar={filter}
      />
    </div>
  );
};

export default Home;
