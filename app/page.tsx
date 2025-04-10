'use client';

import type {
  WebWorkerMLCEngine,
  InitProgressReport,
  ChatCompletionMessageParam,
} from '@mlc-ai/web-llm';
import type { Message, Messages } from '@/types';
import { createWebLLMEngine, registerServiceWorker } from '@/llmUtils';
import { useCallback, useEffect, useState } from 'react';
import Chat from '@/components/widgets/Chat';

export default function Home() {
  const [engine, setEngine] = useState<WebWorkerMLCEngine | null>(null);
  const [messages, setMessages] = useState<Messages>([
    { role: 'system', content: 'You are a helpful DuckDB AI assistant.' },
  ]);
  const [message, setMessage] = useState<Message | null>(null);
  const [response, setResponse] = useState<Message | null>(null);
  const [progress, setProgress] = useState(0);

  const initProgressCallback = useCallback(
    (initProgress: InitProgressReport) => {
      const progress = (initProgress.progress * 100).toFixed(2);
      setProgress(parseInt(progress));
    },
    [],
  );

  const updateMessages = (newMessage: ChatCompletionMessageParam) => {
    setMessages((messages) => [...messages, newMessage]);
    setMessage(newMessage);
  };

  const converse = useCallback(() => {
    if (engine && message) {
      (async () => {
        const chunks = await engine.chat.completions.create({
          messages: [message],
          temperature: 1,
          stream: true, // <-- Enable streaming
          stream_options: { include_usage: true },
        });

        let reply = '';

        for await (const chunk of chunks) {
          reply += chunk.choices[0]?.delta.content || '';
          setResponse({
            role: 'assistant',
            content: reply,
          });
          if (chunk.usage) {
            console.log(chunk.usage);
          }
        }

        const fullReply = await engine.getMessage();
        updateMessages({
          role: 'assistant',
          content: fullReply,
        });
        setResponse(null);
        setMessage(null);
      })();
    }
  }, [engine, message]);

  useEffect(() => {
    (async () => {
      await registerServiceWorker();
      const engine = await createWebLLMEngine(initProgressCallback, true);
      setEngine(engine);
    })();
  }, [initProgressCallback]);

  useEffect(() => {
    if (message !== null) {
      converse();
    }
  }, [converse, message]);

  if (!engine) {
    return (
      <div className="h-dvh flex justify-center">
        <p>{progress}%</p>
        <p>Loading</p>
      </div>
    );
  }

  if (engine) {
    return (
      <div className="h-dvh flex justify-center">
        <Chat
          updateMessages={updateMessages}
          messages={messages}
          response={response}
        />
      </div>
    );
  }

  return null;
}
