// Qwen3-0.6B is a newer/stronger small model than Qwen2.5-0.5B at a similar size
// (~0.45 GB with q4). We keep the q4 weights that are proven to run on the user's
// device — the fp16 (q4f16) path produced NaN garbage, and 1.5B was too big to load.
// Qwen3 is a reasoning model, so we disable its "thinking" mode (see "/no_think").
export const LLM_MODEL_ID = 'onnx-community/Qwen2.5-1.5B-Instruct';

export const LLM_MAX_NEW_TOKENS = 256;

export type LlmStatus = 'idle' | 'loading' | 'ready' | 'generating' | 'unsupported' | 'error';

export interface LlmProgress {
  status: LlmStatus;
  loaded: number;
  total: number;
  message: string;
}
