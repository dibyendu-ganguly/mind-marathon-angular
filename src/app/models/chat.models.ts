export interface ChatMessageModel{
  senderId:string;
  senderName:string;
  senderImgUrl?:string;
  sentTime:string;
  message:string;
}


export const SOCKET_EVENTS = {
  Connection: 'connection',
  Message: 'message',
  CreateRoom: 'create room',
  JoinRoom: 'join room',
  RoomMemberUpdated: 'room leave enter',
  Typing: 'typing',
  StoppedTyping: 'stop typing',
  LeaveRoom: 'leave room',
  Disconnect: 'disconnect'
}

export interface ServerEvent {
  status: 'ok' | 'error';
  message: string;
  data: unknown;
}

export interface UserMessage{
  message: string;
  sentTime: string;
  senderId: string;
  senderName:string;
  senderImgUrl?:string;
  sentTo: string;
}
