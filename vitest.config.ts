import { defineConfig } from 'vitest/config';

// Standalone config so tests don't pull in the PWA/svgr build plugins — the
// engine modules under test are pure TS. Runs the real lookup logic against the
// real data files in public/ so regressions (e.g. "cup" → coffee) fail the suite.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
