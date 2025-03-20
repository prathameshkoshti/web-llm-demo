import type { Message, Messages } from '@/types';

export type ChatProps = {
  messages: Messages;
  response: Message | null;
  updateMessages: (massage: Message) => void;
};
