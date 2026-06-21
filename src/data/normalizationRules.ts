import type { NormalizationRule } from '../models/Normalization';

/**
 * Ordered token-level rules that collapse Finglish spelling variants onto a
 * single canonical key (e.g. khubam / khobam / khoobam / khubaam -> "khubam").
 * Digraphs are resolved before single letters; duplicate letters collapse last.
 */
export const normalizationRules: NormalizationRule[] = [
  { pattern: /q/g, replacement: 'gh' },
  { pattern: /w/g, replacement: 'v' },
  { pattern: /ph/g, replacement: 'f' },
  { pattern: /ck/g, replacement: 'k' },
  { pattern: /aa|â/g, replacement: 'a' },
  { pattern: /oo|ou/g, replacement: 'u' },
  { pattern: /ee|ie/g, replacement: 'i' },
  { pattern: /eh$/g, replacement: 'e' },
  { pattern: /o/g, replacement: 'u' },
  { pattern: /y$/g, replacement: 'i' },
  { pattern: /iy|yi/g, replacement: 'i' },
  { pattern: /(.)\1+/g, replacement: '$1' },
];
