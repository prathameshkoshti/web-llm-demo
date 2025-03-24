import { ServiceWorkerMLCEngineHandler } from '@mlc-ai/web-llm';

let handler;

self.addEventListener('activate', function () {
  handler = new ServiceWorkerMLCEngineHandler();
  console.log('Web-LLM Service Worker Activated');
});
