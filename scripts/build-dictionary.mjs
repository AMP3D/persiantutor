// Regenerate public/dictionary.json from Wiktionary (kaikki.org).
//   1. curl -sL https://kaikki.org/dictionary/Persian/kaikki.org-dictionary-Persian.jsonl -o _kaikki.jsonl
//   2. node scripts/build-dictionary.mjs
// Tuple shape: [term, farsi, meaning, pos, aliasKeys?]
import { createReadStream, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';

// Mirror of the app's normalize() so generated keys match runtime keys.
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
    .replace(/[ġĠ]/g, 'gh')
    .replace(/[qQ]/g, 'gh')
    .replace(/[ʾʿ‘’'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const PERSIAN = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/g;
const isPersianScript = (w) => /[؀-ۿ]/.test(w);

const SKIP =
  /^(alternative |obsolete |misspelling |romanization of|abbreviation |initialism |acronym |clipping |plural of |singular of |inflection of |dual of |vocative |genitive |construct |.+ spelling of |.+ form of |superseded|nonstandard |dated (form|spelling)|eye dialect|honorific|Judeo-Persian)/i;

// Turn a Wiktionary gloss into a plain meaning: drop Persian script and
// parenthetical transliterations, keep the meaning after a "descriptor:" colon,
// and discard bare grammatical pointers ("short for", "present stem of", …).
const cleanGloss = (raw) => {
  let s = raw.replace(/\([^)]*\)/g, ' ').replace(PERSIAN, ' ').replace(/[“”]/g, '"');
  if (s.includes(':')) {
    const after = s.slice(s.lastIndexOf(':') + 1).trim();
    if (after) s = after;
  }
  s = s
    .replace(/\s+/g, ' ')
    .replace(/^[\s:;,."'·\-–—]+|[\s:;,."']+$/g, '')
    .trim();
  if (!s) return '';
  if (/^(short for|see|compare|synonym of|alternative|abbreviation|initialism|acronym)\b/i.test(s)) {
    return '';
  }
  if (/\b(participle|present stem|past stem|imperative stem|infinitive)\s+of\b/i.test(s)) return '';
  return s;
};

// Prefer content words when several entries share a key (dast: noun "hand" > classifier).
const POS_RANK = {
  noun: 6,
  verb: 6,
  adj: 6,
  adv: 5,
  num: 4,
  pron: 4,
  name: 4,
  phrase: 3,
  intj: 3,
  conj: 2,
  prep: 2,
  particle: 2,
  det: 2,
  postp: 1,
  classifier: 1,
  prefix: 0,
  suffix: 0,
  character: 0,
};
const rankOf = (pos) => POS_RANK[pos] ?? 1;

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

    const romans = (obj.forms ?? [])
      .filter((f) => f.tags?.includes('romanization') && typeof f.form === 'string')
      .map((f) => f.form);
    const trFallback = obj.head_templates?.find((h) => h.args?.tr)?.args?.tr;
    if (!romans.length && typeof trFallback === 'string') romans.push(trFallback);
    if (!romans.length) continue;

    const glosses = [];
    for (const sense of obj.senses ?? []) {
      for (const g of sense.glosses ?? []) {
        if (typeof g !== 'string' || SKIP.test(g)) continue;
        const cleaned = cleanGloss(g);
        if (cleaned) glosses.push(cleaned);
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

    const pos = typeof obj.pos === 'string' ? obj.pos : '';
    const aliasKeys = keys.filter((k) => k !== primary);
    const tuple = aliasKeys.length ? [term, obj.word, meaning, pos, aliasKeys] : [term, obj.word, meaning, pos];

    const rank = rankOf(pos);
    const existing = seen.get(primary);
    if (!existing || rank > existing.rank) seen.set(primary, { rank, tuple });
  }

  const out = [...seen.values()].map((v) => v.tuple);
  writeFileSync('public/dictionary.json', JSON.stringify(out));
  console.log('scanned lines:', total, '| dictionary entries:', out.length);

  const byKey = new Map();
  for (const e of out) {
    byKey.set(normalize(e[0]), e);
    for (const k of e[4] ?? []) if (!byKey.has(k)) byKey.set(k, e);
  }
  for (const q of ['ab', 'baste', 'dast', 'ketab', 'cheshm', 'darya', 'raftan', 'goftan', 'zaban']) {
    const h = byKey.get(normalize(q));
    console.log(`  ${q} -> ${h ? `${h[0]} [${h[3]}] | ${h[1]} | ${h[2].slice(0, 55)}` : 'NO MATCH'}`);
  }
};

run();
