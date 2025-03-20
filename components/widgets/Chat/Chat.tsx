import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import type { Message as MessageType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ChatProps } from './types';
import Message from '../Message';

function Chat({ messages, response, updateMessages }: ChatProps) {
  const [messageText, setMessageText] = useState('');

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMessageText(event.currentTarget.value);
  };

  const onSend = () => {
    if (messageText !== '') {
      const incomingMessage: MessageType = {
        role: 'user',
        content: messageText,
      };
      updateMessages(incomingMessage);
      setMessageText('');
    }
  };

  return (
    <div className="h-dvh flex justify-center">
      <div className="h-full flex flex-col p-4 w-xl">
        <div className="flex-1 flex flex-col gap-4 py-4 justify-end">
          {messages.map((message, index) => {
            return (
              <Message key={`${message.role}-${index}`} message={message} />
            );
          })}
          {response && <Message message={response} />}
        </div>
        <div className="flex gap-2">
          <Input type="text" value={messageText} onChange={onInputChange} />
          <Button onClick={onSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
