import type { InitProgressCallback } from '@mlc-ai/web-llm';
import type { AppConfig } from '@mlc-ai/web-llm';
import {
  CreateWebWorkerMLCEngine,
} from '@mlc-ai/web-llm';

const selectedModel = 'DuckDB-7B-V1-q4f16_1-MLC';

const appConfig: AppConfig = {
  model_list: [
    {
      model: 'https://huggingface.co/prathameshkoshti/DuckDB-7B-V1-q4f16_1-MLC',
      model_id: 'DuckDB-7B-V1-q4f16_1-MLC',
      model_lib: '/DuckDB-NSQL-7b-chat-hf-q4f16_1-webgpu.wasm',
      vram_required_MB: 10749.02,
      low_resource_required: false,
      required_features: ['shader-f16'],
      overrides: {
        context_window_size: 4096,
      },
    },
  ],
};

export const createWebLLMEngine = async (
  initProgressCallback: InitProgressCallback,
) => {
  const engine = await CreateWebWorkerMLCEngine(
    new Worker(new URL('../worker.ts', import.meta.url), {
      type: 'module',
    }),
    selectedModel,
    { initProgressCallback: initProgressCallback, appConfig }, // engineConfig
  );

  return engine;
};
