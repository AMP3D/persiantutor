import { Link } from 'react-router-dom';
import { theme, toggleTheme } from '../../state/theme';
import Icon from '../Icon/Icon.tsx';
import OverflowMenu from '../OverflowMenu/OverflowMenu.tsx';
import { useBack } from './menuBar';
import './menuBar.scss';

const MenuBar = () => {
  const { canGoBack, goBack } = useBack();

  return (
    <header className="menu-bar">
      <div className="menu-bar__lead">
        {canGoBack && (
          <button type="button" className="icon-btn" aria-label="Go back" onClick={goBack}>
            <Icon name="arrow-left" />
          </button>
        )}
        <h1 className="menu-bar__title">
          <Link to="/">Persian Tutor</Link>
        </h1>
      </div>
      <div className="menu-bar__actions">
        <button
          type="button"
          className="icon-btn"
          aria-label={theme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
        >
          <Icon name={theme.value === 'dark' ? 'sun' : 'moon'} />
        </button>
        <OverflowMenu />
      </div>
    </header>
  );
};

export default MenuBar;
