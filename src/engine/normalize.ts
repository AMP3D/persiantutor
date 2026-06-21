import { normalizationRules } from '../data/normalizationRules';

const normalizeToken = (token: string): string =>
  normalizationRules.reduce((value, rule) => value.replace(rule.pattern, rule.replacement), token);

export const normalize = (input: string): string =>
  input
    .toLowerCase()
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
