import type { InitProgressCallback } from '@mlc-ai/web-llm';
import type { AppConfig } from '@mlc-ai/web-llm';
import {
  CreateServiceWorkerMLCEngine,
  CreateWebWorkerMLCEngine,
} from '@mlc-ai/web-llm';

const selectedModel = 'prathameshkoshti/DuckDB-7B-V1-q4f16_1-MLC';

const appConfig: AppConfig = {
  model_list: [
    {
      model: 'https://huggingface.co/prathameshkoshti/DuckDB-7B-V1-q4f16_1-MLC',
      model_id: 'prathameshkoshti/DuckDB-7B-V1-q4f16_1-MLC',
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

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        type: 'module',
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

export const createWebLLMEngine = async (
  initProgressCallback: InitProgressCallback,
  useServiceWorker: boolean,
) => {
  if (useServiceWorker) {
    const engine = await CreateServiceWorkerMLCEngine(selectedModel, {
      initProgressCallback,
      appConfig,
    });
    return engine;
  } else {
    const engine = await CreateWebWorkerMLCEngine(
      new Worker(new URL('../worker.ts', import.meta.url), {
        type: 'module',
      }),
      selectedModel,
      { initProgressCallback, appConfig }, // engineConfig
    );
    return engine;
  }
};
