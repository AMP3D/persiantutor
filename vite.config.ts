import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/persiantutor/',
  plugins: [
    react({
      babel: {
        plugins: [['module:@preact/signals-react-transform']],
      },
    }),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      pwaAssets: { config: true },
      includeAssets: ['app-icon.svg'],
      manifest: {
        name: 'Persian Tutor',
        short_name: 'Persian Tutor',
        description:
          'Understand Persian (Farsi) words and phrases written in Finglish, with corrections, usage, and meaning.',
        theme_color: '#386641',
        background_color: '#f2e8cf',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/persiantutor/',
        scope: '/persiantutor/',
      },
      workbox: {
        navigateFallback: 'index.html',
        // Precache the dictionary too so first-run/offline lookups work.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      devOptions: { enabled: false },
    }),
  ],
});
