import { useSignalEffect } from '@preact/signals-react';
import { useEffect } from 'react';
import { resetAiAssist, runAiAssist } from '../../state/aiAssist';
import { llmEnabled } from '../../state/llm';
import { runSearch } from '../../state/search';
import { query } from '../SearchBox/searchBox';

export const useWordView = (rawTerm: string | undefined): void => {
  const decoded = rawTerm ? decodeURIComponent(rawTerm) : '';

  useEffect(() => {
    if (!decoded) return;
    query.value = decoded;
    resetAiAssist();
    void runSearch(decoded);
    if (llmEnabled.value) void runAiAssist(decoded);
  }, [decoded]);

  useSignalEffect(() => {
    if (llmEnabled.value && decoded) void runAiAssist(decoded);
  });
};
