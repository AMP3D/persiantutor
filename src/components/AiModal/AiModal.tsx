import { llmProgress } from '../../state/llm';
import Icon from '../Icon/Icon.tsx';
import { aiModalOpen, closeAiModal, confirmAiDownload } from './aiModal';
import './aiModal.scss';

const AiModal = () => {
  if (!aiModalOpen.value) return null;

  const progress = llmProgress.value;
  const phase = progress.status;
  const busy = phase === 'loading' || phase === 'generating';
  const percent = progress.total ? Math.round((progress.loaded / progress.total) * 100) : 0;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="On-device AI">
      <div className="modal__scrim" onClick={busy ? undefined : closeAiModal} />
      <div className="modal__panel">
        <h2 className="modal__title">
          <Icon name="sparkles" />
          On-device AI
        </h2>

        {phase === 'idle' && (
          <>
            <p className="modal__message">
              This downloads an on-device language model (~450 MB) that runs entirely in your
              browser and is cached for offline use afterward.
            </p>
            <p className="modal__message ai-modal__detail">
              The first download can take a few minutes. Please keep the app open until it finishes.
            </p>
            <div className="modal__actions">
              <button className="btn btn--ghost" onClick={closeAiModal} type="button">
                Cancel
              </button>
              <button className="btn" onClick={confirmAiDownload} type="button">
                <Icon name="arrow-down-tray" />
                Download &amp; enable
              </button>
            </div>
          </>
        )}

        {busy && (
          <>
            <p className="modal__message">
              {phase === 'generating'
                ? 'Loading the model into memory…'
                : 'Downloading and caching the model… this can take several minutes.'}
            </p>
            <div className="ai-modal__bar">
              <div className="ai-modal__fill" style={{ width: `${percent || 4}%` }} />
            </div>
            <p className="ai-modal__status">
              {percent ? `${percent}%` : 'Initializing…'}
              {progress.message && phase === 'loading' && ` · ${progress.message}`}
            </p>
            <div className="modal__actions">
              <button className="btn btn--ghost" onClick={closeAiModal} type="button">
                Cancel
              </button>
            </div>
          </>
        )}

        {phase === 'ready' && (
          <>
            <p className="modal__message ai-modal__ready">
              <Icon name="sparkles" />
              AI is ready and cached for offline use.
            </p>
            <div className="modal__actions">
              <button className="btn" onClick={closeAiModal} type="button">
                Done
              </button>
            </div>
          </>
        )}

        {phase === 'error' && (
          <>
            <p className="modal__message ai-modal__error">
              <Icon name="exclamation-triangle" />
              The model could not be loaded. This usually means the device ran out of memory.
            </p>
            {progress.message && <p className="ai-modal__errordetail">{progress.message}</p>}
            <div className="modal__actions">
              <button className="btn btn--ghost" onClick={closeAiModal} type="button">
                Close
              </button>
              <button className="btn" onClick={confirmAiDownload} type="button">
                Retry
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AiModal;
