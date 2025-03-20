import React from 'react';
import type { MessageProps } from './types';

function Message({ message }: MessageProps) {
  if (message.role === 'system') return null;

  const alignment = message.role === 'user' ? 'self-end' : '';
  return (
    <div
      className={`border border-solid p-2 px-4 max-w-3/4 rounded-lg ${alignment}`}
    >
      {message.content as string}
    </div>
  );
}

export default Message;
