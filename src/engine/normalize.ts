import { normalizationRules } from '../data/normalizationRules';

const normalizeToken = (token: string): string =>
  normalizationRules.reduce((value, rule) => value.replace(rule.pattern, rule.replacement), token);

export const normalize = (input: string): string =>
  input
    .toLowerCase()
    // Scholarly \u0121 (g-with-dot, used in the dictionary's romanizations for \u0642/\u063a)
    // must become "gh" \u2014 how people actually type it \u2014 BEFORE NFKD strips the
    // dot and silently flattens it to a bare "g" (so \u0642\u0631\u0627\u0631 keys as "gharar", not
    // "garar", and matches a typed "gharar" exactly instead of via fuzzy).
    .replace(/\u0121/g, 'gh')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\s']/g, ' ')
    .trim()
    .split(/\s+/)
    .map(normalizeToken)
    .filter(Boolean)
    .join(' ');

export const normalizeAll = (values: string[]): string[] => {
  const keys = values.map(normalize).filter(Boolean);
  return [...new Set(keys)];
};
