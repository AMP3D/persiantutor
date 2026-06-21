import { createReadStream, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';

// Mirror of the app's normalize() so spot-checks use identical keys.
const rules = [
  [/q/g, 'gh'],
  [/w/g, 'v'],
  [/ph/g, 'f'],
  [/ck/g, 'k'],
  [/aa|â/g, 'a'],
  [/oo|ou/g, 'u'],
  [/ee|ie/g, 'i'],
  [/eh$/g, 'e'],
  [/o/g, 'u'],
  [/y$/g, 'i'],
  [/iy|yi/g, 'i'],
  [/(.)\1+/g, '$1'],
];
const tok = (t) => rules.reduce((v, [p, r]) => v.replace(p, r), t);
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z\s']/g, ' ')
    .trim()
    .split(/\s+/)
    .map(tok)
    .filter(Boolean)
    .join(' ');

// Scholarly romanization → Finglish (so keys line up with how people type).
const toFinglish = (r) =>
  r
    .replace(/[xX]/g, 'kh')
    .replace(/[šŠ]/g, 'sh')
    .replace(/[čČ]/g, 'ch')
    .replace(/[žŽ]/g, 'zh')
    .replace(/[ǰ]/g, 'j')
    .replace(/[qQ]/g, 'gh')
    .replace(/[ʾʿ‘’'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const isPersianScript = (w) => /[؀-ۿ]/.test(w);
const SKIP =
  /^(alternative |obsolete |misspelling |romanization of|abbreviation |initialism |acronym |clipping |plural of |singular of |inflection of |dual of |vocative |genitive |construct |.+ spelling of |.+ form of |superseded|nonstandard |dated (form|spelling)|eye dialect|honorific|Judeo-Persian)/i;

const stripRef = (g) => g.replace(/\s*\([^)]*\)\s*$/, '').trim();

const run = async () => {
  const rl = createInterface({ input: createReadStream('_kaikki.jsonl'), crlfDelay: Infinity });
  const seen = new Map();
  let total = 0;
  for await (const line of rl) {
    if (!line) continue;
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    total++;
    if (obj.lang_code !== 'fa' || typeof obj.word !== 'string' || !isPersianScript(obj.word)) continue;

    // Persian Wiktionary often lists several romanizations (e.g. Classical "kitāb"
    // then Tehrani "ketâb"). Index the entry under ALL of them; show the last
    // (usually the modern Persian one) as the display spelling.
    const romans = (obj.forms ?? [])
      .filter((f) => f.tags?.includes('romanization') && typeof f.form === 'string')
      .map((f) => f.form);
    const trFallback = obj.head_templates?.find((h) => h.args?.tr)?.args?.tr;
    if (!romans.length && typeof trFallback === 'string') romans.push(trFallback);
    if (!romans.length) continue;

    const glosses = [];
    for (const sense of obj.senses ?? []) {
      for (const g of sense.glosses ?? []) {
        if (typeof g === 'string' && !SKIP.test(g)) glosses.push(stripRef(g));
      }
    }
    if (!glosses.length) continue;

    const terms = romans.map(toFinglish).filter((t) => t && /[a-z]/.test(t) && t.length <= 40);
    if (!terms.length) continue;
    const term = terms[terms.length - 1];
    const keys = [...new Set(terms.map(normalize).filter(Boolean))];
    const primary = normalize(term);
    if (!primary) continue;

    let meaning = [...new Set(glosses)].slice(0, 3).join('; ');
    if (meaning.length > 160) meaning = meaning.slice(0, 157).trimEnd() + '…';

    const aliasKeys = keys.filter((k) => k !== primary);
    const tuple = aliasKeys.length ? [term, obj.word, meaning, aliasKeys] : [term, obj.word, meaning];
    if (!seen.has(primary)) seen.set(primary, tuple);
  }

  const out = [...seen.values()];
  writeFileSync('public/dictionary.json', JSON.stringify(out));
  console.log('scanned lines:', total, '| dictionary entries:', out.length);

  // Spot-check: do common user spellings resolve (via primary key OR alias key)?
  const byKey = new Map();
  for (const e of out) {
    byKey.set(normalize(e[0]), e);
    for (const k of e[3] ?? []) if (!byKey.has(k)) byKey.set(k, e);
  }
  for (const q of ['ab', 'ketab', 'khoob', 'salam', 'chetor', 'doost', 'pool', 'dard', 'ruz']) {
    const hit = byKey.get(normalize(q));
    console.log(`  ${q} -> ${hit ? `${hit[0]} | ${hit[1]} | ${hit[2].slice(0, 50)}` : 'NO MATCH'}`);
  }
};

run();
