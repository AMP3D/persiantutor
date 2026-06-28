import { setFrequencyOrder } from '../engine/frequency';

// Load the frequency-ordered Persian word list (public/frequency.json) into the
// engine so English results can be ranked by spoken commonness. It's small
// (~150 KB) and precached by the service worker, so this runs quietly in the
// background — no modal. Ranking simply falls back to Infinity until it lands.
export const ensureFrequency = async (): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}frequency.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const words = (await response.json()) as string[];
    setFrequencyOrder(words);
  } catch (error) {
    console.error('[freq] failed to load frequency list:', error);
  }
};
