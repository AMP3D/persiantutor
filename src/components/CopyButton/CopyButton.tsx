import { useState } from 'react';
import { copyText } from '../../utils/clipboard';
import Icon from '../Icon/Icon.tsx';
import './copyButton.scss';

interface CopyButtonProps {
  text: string;
  label?: string;
}

const CopyButton = ({ text, label = 'Copy' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onClick = async (): Promise<void> => {
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      className={copied ? 'copy-btn copy-btn--copied' : 'copy-btn'}
      aria-label={`${label} ${text}`}
      onClick={() => void onClick()}
    >
      <Icon name="clipboard" />
      <span className="copy-btn__label">{copied ? 'Copied' : label}</span>
    </button>
  );
};

export default CopyButton;
