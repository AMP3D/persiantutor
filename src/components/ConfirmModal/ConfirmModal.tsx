import { closeConfirm, confirm } from '../../state/ui';
import Icon from '../Icon/Icon.tsx';
import { runConfirm } from './confirmModal';
import './confirmModal.scss';

const ConfirmModal = () => {
  const config = confirm.value;
  if (!config) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={config.title}>
      <div className="modal__scrim" onClick={closeConfirm} />
      <div className="modal__panel">
        <h2 className="modal__title">{config.title}</h2>
        <p className="modal__message">{config.message}</p>
        {config.warning && (
          <p className="modal__warning">
            <Icon name="exclamation-triangle" />
            {config.warning}
          </p>
        )}
        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={closeConfirm}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={() => void runConfirm(config)}>
            {config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
