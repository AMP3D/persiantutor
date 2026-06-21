import { dictProgress, dictStatus } from '../../state/dictionary';
import './dictLoadingModal.scss';

const DictLoadingModal = () => {
  if (dictStatus.value !== 'loading') return null;

  const { loaded, total } = dictProgress.value;
  const percent = total ? Math.round((loaded / total) * 100) : 0;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Preparing dictionary">
      <div className="modal__scrim" />
      <div className="modal__panel">
        <h2 className="modal__title">Preparing the dictionary…</h2>
        <p className="modal__message">
          Downloading the full Persian dictionary so lookups work offline. This happens only once.
        </p>
        <div className="dict-modal__bar">
          <div className="dict-modal__fill" style={{ width: `${percent || 4}%` }} />
        </div>
        <p className="dict-modal__status">
          {total ? `${loaded.toLocaleString()} / ${total.toLocaleString()} words` : 'Starting…'}
        </p>
      </div>
    </div>
  );
};

export default DictLoadingModal;
