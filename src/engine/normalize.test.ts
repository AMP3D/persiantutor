import { describe, expect, it } from 'vitest';
import { normalize } from './normalize';

describe('normalize — Finglish keying', () => {
  it('converges spelling variants to one key', () => {
    const key = normalize('khubam');
    expect(normalize('khoobam')).toBe(key);
    expect(normalize('khubaam')).toBe(key);
  });

  // Regression: the dictionary romanizes ق/غ as the scholarly "ġ"; NFKD used to
  // flatten it to a bare "g", so "gharar" never matched قرار ("ġarâr") exactly.
  it('keys scholarly ġ as "gh", matching how people type it', () => {
    expect(normalize('ġarâr')).toBe('gharar');
    expect(normalize('gharar')).toBe(normalize('ġarâr'));
    expect(normalize('ġahve')).toBe('ghahve'); // coffee
    expect(normalize('ġalb')).toBe('ghalb'); // heart
  });
});
