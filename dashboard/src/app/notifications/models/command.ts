export interface Message {
  id: string;
  type: 'success' | 'error' | 'clear';
  text?: string;
}
