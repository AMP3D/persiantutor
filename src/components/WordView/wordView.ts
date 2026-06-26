import { useSignalEffect } from '@preact/signals-react';
import { useEffect } from 'react';
import { resetAiAssist, runAiAssist } from '../../state/aiAssist';
import { llmEnabled } from '../../state/llm';
import type { SearchMode } from '../../models/Lookup';
import { runSearch } from '../../state/search';
import { query, searchMode } from '../SearchBox/searchBox';

export const useWordView = (rawTerm: string | undefined, mode: SearchMode): void => {
  const decoded = rawTerm ? decodeURIComponent(rawTerm) : '';

  useEffect(() => {
    if (!decoded) return;
    query.value = decoded;
    searchMode.value = mode;
    resetAiAssist();
    void runSearch(decoded, mode);
    if (llmEnabled.value) void runAiAssist(decoded);
  }, [decoded, mode]);

  useSignalEffect(() => {
    if (llmEnabled.value && decoded) void runAiAssist(decoded);
  });
};
