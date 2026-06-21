// SmolLM2-360M is a compact instruction-tuned model from HuggingFace (~200 MB with q4).
// Ungated and lightweight enough for mobile, while still useful for short structured tasks.
export const LLM_MODEL_ID = 'HuggingFaceTB/SmolLM2-360M-Instruct';

export const LLM_MAX_NEW_TOKENS = 256;

export type LlmStatus = 'idle' | 'loading' | 'ready' | 'generating' | 'unsupported' | 'error';

export interface LlmProgress {
  status: LlmStatus;
  loaded: number;
  total: number;
  message: string;
}
