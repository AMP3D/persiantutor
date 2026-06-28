// Mine colloquial Persian->English translations from the OPUS OpenSubtitles
// fa-en parallel corpus (spoken/conversational), to surface senses the formal
// Wiktionary dictionary misses (e.g. موتور -> motorcycle/bike, not just "motor").
//
//   1. curl -sL https://object.pouta.csc.fi/OPUS-OpenSubtitles/v2018/moses/en-fa.txt.zip -o _os.zip
//   2. unzip _os.zip -d _os
//   3. node scripts/align-corpus.mjs [corpusDir=_os] [maxLines=2000000]
//
// Output: public/senses.json — { normFaKey: ["english", ...] }, the high-
// confidence colloquial senses a dictionary entry's gloss is missing (e.g. موتور
// -> motorcycle, bike), filtered by a symmetric translation score so co-occurrence
// noise (a لیوان holds "milk", but "milk" -> شیر) is dropped. The app loads this
// as **hidden English match keywords** (engine/senses.ts): they make English
// lookup find the right word without changing any displayed definition — a fully
// offline, no-API-key path to broad colloquial coverage.
//
// Corpus attribution: OpenSubtitles via OPUS (http://www.opensubtitles.org).
// Cite: P. Lison & J. Tiedemann, OpenSubtitles2016, LREC 2016.
import { createReadStream, readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';

// Mirror of engine/frequency.ts -> normFa.
const STRIP = new Set([
  0x200c, 0x200d, 0x200e, 0x200f, 0x0640, 0x0670, 0x064b, 0x064c, 0x064d, 0x064e, 0x064f, 0x0650,
  0x0651, 0x0652,
]);
const REMAP = new Map([
  [0x064a, 0x06cc],
  [0x0649, 0x06cc],
  [0x0643, 0x06a9],
  [0x0623, 0x0627],
  [0x0625, 0x0627],
  [0x0622, 0x0627],
  [0x0629, 0x0647],
]);
const normFa = (s) => {
  let o = '';
  for (const ch of s) {
    const cp = ch.codePointAt(0) ?? 0;
    if (STRIP.has(cp)) continue;
    const m = REMAP.get(cp);
    o += m === undefined ? ch : String.fromCodePoint(m);
  }
  return o.trim();
};

const STOP = new Set(
  ('the a an and or but if then to of in on at for with from by as is are was were be been being it ' +
    'this that these those i you he she we they me him her us them my your his its our their what who ' +
    'not no do does did done have has had will would can could should may might must just so very ' +
    'about up down out off over here there now all any some one get got go going gone come came know ' +
    'like want make made see saw look right okay yeah well dont im youre hes shes ill cant let us')
    .split(' '),
);

const tokensFa = (line, dictSet) => {
  const out = new Set();
  for (const raw of line.split(/[\s،.!؟?:;«»"'()\-]+/)) {
    const w = normFa(raw);
    if (w.length >= 2 && dictSet.has(w)) out.add(w);
  }
  return out;
};

const tokensEn = (line) => {
  const out = new Set();
  for (const raw of line.toLowerCase().split(/[^a-z]+/)) {
    if (raw.length >= 3 && !STOP.has(raw)) out.add(raw);
  }
  return out;
};

const MIN_COOC = 30; // ignore noisy rare co-occurrences
const MIN_FA = 120; // need enough observations of the Persian word to trust the stats
const SYM_THRESH = 0.07; // min mutual-translation score (geometric mean of both directions)
const TOP_PER_WORD = 4;

// English words already present in an entry's gloss, lightly stemmed so we don't
// re-add a plural/variant the dictionary already has.
const stem = (w) => w.replace(/(ies|es|s)$/, '');
const glossWords = (meaning) => {
  const words = meaning.toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 3);
  return { set: new Set(words.map(stem)), list: words };
};

const editDistance = (a, b) => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = curr;
  }
  return prev[b.length];
};

// A candidate that is an existing gloss word plus a short inflectional tail
// (defend→defending, environment→environmental) is redundant clutter. Only a
// ≤3-char suffix counts, so distinct compounds (motor→motorcycle) are kept.
const isVariantOf = (cand, glossList) =>
  glossList.some((g) => {
    const [short, long] = cand.length <= g.length ? [cand, g] : [g, cand];
    return long.startsWith(short) && long.length - short.length <= 3;
  });

const run = async () => {
  const dir = process.argv[2] ?? '_os';
  const maxLines = Number(process.argv[3] ?? 2_000_000);

  const dict = JSON.parse(readFileSync('public/dictionary.json', 'utf8'));
  const dictSet = new Set();
  const dictByFa = new Map(); // normFa(farsi) -> tuple (first wins)
  for (const t of dict) {
    if (!t[1] || t[1].includes(' ')) continue;
    const k = normFa(t[1]);
    dictSet.add(k);
    if (!dictByFa.has(k)) dictByFa.set(k, t);
  }
  console.log('dict single-word farsi:', dictSet.size, '| scanning up to', maxLines, 'pairs');

  const faN = new Map(); // sentences containing fa word
  const enN = new Map(); // sentences containing en word
  const cooc = new Map(); // fa -> Map(en -> count)

  const en = createInterface({ input: createReadStream(`${dir}/OpenSubtitles.en-fa.en`), crlfDelay: Infinity });
  const fa = createInterface({ input: createReadStream(`${dir}/OpenSubtitles.en-fa.fa`), crlfDelay: Infinity });
  const enIt = en[Symbol.asyncIterator]();
  const faIt = fa[Symbol.asyncIterator]();

  let n = 0;
  while (n < maxLines) {
    const [e, f] = await Promise.all([enIt.next(), faIt.next()]);
    if (e.done || f.done) break;
    n++;
    const faToks = tokensFa(f.value, dictSet);
    if (faToks.size === 0) continue;
    const enToks = tokensEn(e.value);
    if (enToks.size === 0) continue;
    for (const ft of faToks) {
      faN.set(ft, (faN.get(ft) ?? 0) + 1);
      let inner = cooc.get(ft);
      if (!inner) cooc.set(ft, (inner = new Map()));
      for (const et of enToks) inner.set(et, (inner.get(et) ?? 0) + 1);
    }
    for (const et of enToks) enN.set(et, (enN.get(et) ?? 0) + 1);
    if (n % 500_000 === 0) console.log('  ...', n, 'pairs');
  }
  console.log('scanned', n, 'pairs; scoring...');

  // For each Persian word, score English candidates by a symmetric translation
  // score — the geometric mean of p(en|fa) and p(fa|en). Co-occurrence noise
  // (you drink "milk" from a لیوان, but "milk" most-associates with شیر) scores
  // low in at least one direction, so it's filtered out. Only keep clean senses
  // the dictionary gloss doesn't already have.
  const overlay = {}; // normFa(farsi) -> [extra english senses]
  for (const [ft, inner] of cooc) {
    const fc = faN.get(ft) ?? 0;
    if (fc < MIN_FA) continue;
    const entry = dictByFa.get(ft);
    if (!entry) continue;
    const have = glossWords(entry[2]);
    const term = entry[0].toLowerCase().replace(/[^a-z]/g, '');
    const scored = [];
    for (const [et, c] of inner) {
      if (c < MIN_COOC || have.set.has(stem(et))) continue;
      if (isVariantOf(et, have.list)) continue; // morphological variant of the gloss
      if (editDistance(et, term) <= 2) continue; // transliteration noise (درو→"door")
      const pEF = c / fc;
      const pFE = c / (enN.get(et) ?? c);
      const sym = Math.sqrt(pEF * pFE);
      if (sym >= SYM_THRESH) scored.push({ et, sym });
    }
    scored.sort((a, b) => b.sym - a.sym);
    const top = scored.slice(0, TOP_PER_WORD).map((s) => s.et);
    if (top.length) overlay[ft] = top;
  }

  writeFileSync('public/senses.json', JSON.stringify(overlay));
  console.log('wrote public/senses.json — extra senses for', Object.keys(overlay).length, 'entries');

  const show = (fa) => {
    const e = dictByFa.get(normFa(fa));
    console.log(
      '  ' + fa.padEnd(10) + ' gloss="' + (e ? e[2].slice(0, 30) : '?') + '"  +adds: ' +
        (overlay[normFa(fa)]?.join(', ') ?? '(none)'),
    );
  };
  console.log('\nspot checks:');
  for (const fa of ['موتور', 'لیوان', 'سکته', 'گوشی', 'ماشین', 'سگ', 'یخچال', 'کفش']) show(fa);
};

run();
