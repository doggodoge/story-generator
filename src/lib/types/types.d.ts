type Message = {
  username: string;
  message: string;
  isCurrentUser: boolean;
  type: 'action' | 'dialog';
};

export type { Message };
