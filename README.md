# Persian Tutor

A lightweight PWA for understanding Persian (Farsi) words and phrases written in Finglish — it
corrects the spelling, shows formal and informal usage, and explains the meaning like a tutor, not a
plain translator. Runs on Android (installable via Chrome) and desktop browsers, free of ads and
nonsense.

[Click here to access the app](https://amp3d.github.io/persiantutor)

## How it works

Lookups are layered and offline-first:

1. **Normalize** the Finglish so spelling variants converge (`khubam`, `khobam`, `khoobam`,
   `khubaam` → one entry).
2. **Exact match** against the IndexedDB dictionary (instant).
3. **Fuzzy match** with Fuse.js for close spellings.
4. **Optional on-device AI** (opt-in) for words the dictionary doesn't know — a small model runs in
   the browser and its answers are cached for offline use afterward.

Steps 1–3 need no network and ship with ~180 starter words; step 4 only downloads a model if you
enable "AI explanations".

## Tech Stack

- React + TypeScript (Vite)
- SCSS for styling
- @preact/signals-react for state
- Dexie.js (IndexedDB) for persistent storage
- Fuse.js for fuzzy Finglish matching
- @huggingface/transformers for the optional on-device LLM
- vite-plugin-pwa for offline/installable support

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173/persiantutor/` in Chrome. Use DevTools device mode for mobile layout.

## Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start dev server                           |
| `npm run build`   | Type-check and production build            |
| `npm run preview` | Preview production build                   |
| `npm run format`  | Format code with Prettier                  |
| `npm run lint`    | Lint with ESLint                           |
| `npm run deploy`  | Build and publish to the `gh-pages` branch |

## Data: backup, restore, reset

Use the ⋮ menu in the header to **Export DB** (download a JSON backup of all entries and history),
**Import DB** (restore from a backup), or **Clear DB** (reset to the starter words). Import and Clear
ask you to confirm and remind you to export first.

## Install as PWA (Android)

1. Open the app URL in Chrome on Android
2. Tap the browser menu (⋮)
3. Select "Add to Home screen"
