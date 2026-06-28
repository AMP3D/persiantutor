import { setSenses } from '../engine/senses';

// Load the corpus-mined English sense overlay (public/senses.json) into the
// engine so English lookup gains colloquial senses the dictionary gloss lacks.
// Small (~55 KB) and precached by the service worker, so it loads quietly in the
// background; English matching simply falls back to the gloss until it lands.
export const ensureSenses = async (): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}senses.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as Record<string, string[]>;
    setSenses(data);
  } catch (error) {
    console.error('[senses] failed to load sense overlay:', error);
  }
};
