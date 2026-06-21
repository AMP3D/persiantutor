import { useRef } from 'react';
import { llmEnabled } from '../../state/llm';
import { closeMenu, menuOpen, toggleMenu } from '../../state/ui';
import { requestEnableAi } from '../AiModal/aiModal';
import Icon from '../Icon/Icon.tsx';
import { exportDb, handleImportFile, requestClear, requestClearAiCache } from './overflowMenu';
import './overflowMenu.scss';

const OverflowMenu = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAiToggle = (): void => {
    closeMenu();
    requestEnableAi(llmEnabled.value);
  };

  return (
    <div className="overflow-menu">
      <button
        aria-expanded={menuOpen.value}
        aria-haspopup="true"
        aria-label="More options"
        className="icon-btn"
        onClick={toggleMenu}
        type="button"
      >
        <Icon name="ellipsis-vertical" />
      </button>

      {menuOpen.value && (
        <>
          <div className="overflow-menu__scrim" onClick={closeMenu} />
          <ul className="overflow-menu__list" role="menu">
            <li role="none">
              <button onClick={requestClear} role="menuitem" type="button">
                <Icon name="trash" />
                Clear DB
              </button>
            </li>
            <li role="none">
              <button onClick={() => void exportDb()} role="menuitem" type="button">
                <Icon name="arrow-down-tray" />
                Export DB
              </button>
            </li>
            <li role="none">
              <button onClick={() => fileRef.current?.click()} role="menuitem" type="button">
                <Icon name="arrow-up-tray" />
                Import DB
              </button>
            </li>
            <li role="none">
              <button onClick={requestClearAiCache} role="menuitem" type="button">
                <Icon name="trash" />
                Clear AI cache
              </button>
            </li>
            <li role="none">
              <button
                aria-checked={llmEnabled.value}
                onClick={handleAiToggle}
                role="menuitemcheckbox"
                type="button"
              >
                <Icon name="sparkles" />
                {llmEnabled.value ? 'Disable AI explanations' : 'Enable AI explanations'}
              </button>
            </li>
          </ul>
        </>
      )}

      <input
        accept="application/json"
        hidden
        onChange={handleImportFile}
        ref={fileRef}
        type="file"
      />
    </div>
  );
};

export default OverflowMenu;
