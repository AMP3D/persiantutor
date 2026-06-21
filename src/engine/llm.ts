import type { DictionaryEntry, Register, Usage } from '../models/Entry';
import { LLM_MAX_NEW_TOKENS, LLM_MODEL_ID, type LlmProgress } from '../models/Llm';
import { normalize, normalizeAll } from './normalize';

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

type ProgressEvent = { status?: string; file?: string; loaded?: number; total?: number };

type Generator = (
  input: ChatMessage[],
  options: Record<string, unknown>,
) => Promise<Array<{ generated_text: string | ChatMessage[] }>>;

const SYSTEM_PROMPT = [
  'You are a Persian (Farsi) tutor for "Finglish" (Persian written with Latin letters).',
  'The user gives ONE Finglish word or phrase. Reply with ONLY these five lines, nothing before or after,',
  'and keep every line short (no rambling):',
  'Corrected: <clean finglish spelling>',
  'Meaning: <short English meaning>',
  'Informal: <casual finglish sentence> = <english translation>',
  'Formal: <polite finglish sentence> = <english translation>',
  'Note: <one short note, or ->',
].join('\n');

// Worked examples as real chat turns — small models follow the task far better this way.
const FEWSHOT: ChatMessage[] = [
  { role: 'user', content: 'Finglish: "merci"' },
  {
    role: 'assistant',
    content:
      'Corrected: merci\nMeaning: thank you\nInformal: merci dadash = thanks, man\nFormal: kheyli mamnoonam = thank you very much\nNote: borrowed from French',
  },
  { role: 'user', content: 'Finglish: "ab"' },
  {
    role: 'assistant',
    content:
      'Corrected: ab\nMeaning: water\nInformal: ye livan ab bede = give me a glass of water\nFormal: lotfan ye livan ab bedid = please give me a glass of water\nNote: -',
  },
];

let generatorPromise: Promise<Generator> | null = null;

const extractText = (output: Array<{ generated_text: string | ChatMessage[] }>): string => {
  const generated = output[0]?.generated_text;
  const text = Array.isArray(generated) ? (generated.at(-1)?.content ?? '') : (generated ?? '');
  // Qwen3 is a reasoning model — drop any <think>…</think> block it emits.
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
};

const lineValue = (text: string, label: string): string | undefined => {
  const match = text.match(new RegExp(`^\\s*${label}\\s*:\\s*(.+)$`, 'im'));
  return match?.[1]?.trim();
};

const usageLine = (text: string, label: string, register: Register): Usage | null => {
  const raw = lineValue(text, label);
  if (!raw) return null;
  const split = raw.indexOf('=');
  const finglish = (split >= 0 ? raw.slice(0, split) : raw).trim();
  const english = (split >= 0 ? raw.slice(split + 1) : '').trim();
  return finglish ? { register, finglish, english } : null;
};

const freeform = (text: string): string =>
  text
    .replace(/```[a-z]*\n?|```/gi, '')
    .replace(/^\s*(Corrected|Note)\s*:.*$/gim, '')
    .replace(/^\s*(Meaning|Informal|Formal)\s*:\s*/gim, '')
    .replace(/\s+/g, ' ')
    .trim();

// Reject incoherent output: loops ("āb āb āb…") or concatenated word-salad
// ("songsongsong…") that a too-small model can emit.
const isDegenerate = (text: string): boolean => {
  const words = text.toLowerCase().match(/\p{L}+/gu) ?? [];
  if (words.length < 4) return false;
  const longest = words.reduce((max, word) => Math.max(max, word.length), 0);
  if (longest > 24) return true;
  return new Set(words).size / words.length < 0.4;
};

export const isLlmSupported = (): boolean =>
  typeof navigator !== 'undefined' && typeof WebAssembly !== 'undefined';

export const loadModel = async (
  onProgress?: (progress: LlmProgress) => void,
): Promise<Generator> => {
  if (!generatorPromise) {
    generatorPromise = (async () => {
      try {
        const { pipeline } = await import('@huggingface/transformers');
        const adapter = await navigator.gpu?.requestAdapter().catch(() => null);
        const device = adapter ? 'webgpu' : 'wasm';
        // Always use the non-fp16 q4 weights: fp16 (q4f16) produces NaN logits and
        // garbage output on some GPUs, even when WebGPU reports as available.
        const generator = await pipeline('text-generation', LLM_MODEL_ID, {
          dtype: 'q4',
          device,
          progress_callback: (event: ProgressEvent) =>
            onProgress?.({
              status: 'loading',
              loaded: event.loaded ?? 0,
              total: event.total ?? 0,
              message: event.file ?? 'Downloading model…',
            }),
        });
        return generator as unknown as Generator;
      } catch (error) {
        console.error('[AI] Failed to load the on-device model:', error);
        generatorPromise = null;
        throw error;
      }
    })();
  }
  return generatorPromise;
};

// Drop the in-memory model so the next request reloads it (used after clearing the cache).
export const resetModel = (): void => {
  generatorPromise = null;
};

export const generateEntry = async (
  query: string,
  onProgress?: (progress: LlmProgress) => void,
): Promise<DictionaryEntry | null> => {
  const generator = await loadModel(onProgress);
  onProgress?.({ status: 'generating', loaded: 0, total: 0, message: 'Thinking…' });

  const output = await generator(
    [
      { role: 'system', content: SYSTEM_PROMPT },
      ...FEWSHOT,
      { role: 'user', content: `Finglish: "${query.trim()}" /no_think` },
    ],
    {
      max_new_tokens: LLM_MAX_NEW_TOKENS,
      do_sample: false,
      repetition_penalty: 1.2,
      no_repeat_ngram_size: 4,
      return_full_text: false,
    },
  );

  const text = extractText(output).trim();
  if (!text || isDegenerate(text)) return null;

  const meaning = lineValue(text, 'Meaning');
  const term = lineValue(text, 'Corrected')?.trim() || query.trim();
  const note = lineValue(text, 'Note')
    ?.replace(/^[-–—\s]*$/, '')
    .trim();

  const base = {
    tags: [],
    source: 'llm' as const,
    createdAt: Date.now(),
  };

  if (meaning) {
    const usages = [
      usageLine(text, 'Informal', 'informal'),
      usageLine(text, 'Formal', 'formal'),
    ].filter((usage): usage is Usage => usage !== null);
    return {
      ...base,
      term,
      normalizedKey: normalize(term),
      aliases: normalizeAll([term, query]),
      meaning,
      usages,
      note: note || undefined,
    };
  }

  // The small model didn't follow the format — show its raw answer rather than nothing.
  const fallback = freeform(text);
  if (!fallback) return null;
  return {
    ...base,
    term: query.trim(),
    normalizedKey: normalize(query),
    aliases: normalizeAll([query]),
    meaning: fallback,
    usages: [],
    note: undefined,
  };
};
