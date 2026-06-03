import { computed, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from '../../environments/environment';
import { ToastComponent } from '../components/shared/toast/toast.component';
import { AuthService } from './auth.service';
import { ChatConstants } from '../constants/chat.constants';
import { ChatMessageModel, SOCKET_EVENTS, ServerEvent, UserMessage } from '../models/chat.models';
import { StorageService } from './storage.service';
import { error } from 'console';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private serverAlerts$: Subject<string> = new Subject();
  processingMessage = false;
  serverMessageList :string[] = [];

  private message$: Subject<string> = new Subject();
  socket: Socket = io(environment.backendUrl, {autoConnect:false});

  private storage: StorageService = inject(StorageService);

  roomId = signal<string | null>(null);
  roomConnected = computed(() => {
    const roomId = this.roomId();
    if (!!roomId) {
      this.storage.setItem('roomId',roomId);
      return true;
    }
    this.storage.removeItem('roomId');
    return false;
  });
  roomUsers = signal<string[]>([]);

  previousMessages : ChatMessageModel[] = [];

  private members$: BehaviorSubject<string[]> = new BehaviorSubject(([] as string[]));

  private _snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);


  constructor() { }

  private getNextMessage(): string | undefined {
    return this.serverMessageList.length ? this.serverMessageList.shift() : undefined;
  }
  openSnackBar() {
    // this._snackBar.open(message, action , {duration});
    const nextMessage = this.getNextMessage();
    if(!nextMessage){
      this.processingMessage = false; // No message in the queue, set flag false
      return;
    }

    this.processingMessage = true; // A message was dequeued and is being processed

    this._snackBar.openFromComponent(ToastComponent , {
      data: {message : nextMessage},
      duration: 10000
    })
    .afterDismissed()
    .subscribe(() => {
      this.openSnackBar();
    });
  }

  pushServerAlertMsg(msg:string, emit = true){
    this.serverMessageList.push(msg);
    if(emit){
      this.serverAlerts$.next(msg);
    }
  }

  isServerDisconnected(reconnect = true){
    if(!this.socket.connected){
      this.pushServerAlertMsg('Server disconnected');
      if(reconnect){
        let retryCount = 5;
        while(retryCount > 0){
          try {
            this.socket.connect();
            //If the connection is successful, exit the loop
            if(this.socket.connected){
              this.pushServerAlertMsg('Reconnected to server');
              break;
            }

            throw new Error('Connection attempt failed.');
          } catch (error) {
            retryCount--;
            this.pushServerAlertMsg(`${error} Trying to reconnect. Retries left: ${retryCount}`);
          } finally {
            if(retryCount === 0){
              this.pushServerAlertMsg('Unable to connect to server. Please check your connection and try again later.');
            }
          }
        }
      }
    }

    return !this.socket.connected;
  }
  createRoom(myUserId: string) {
    if (this.roomConnected()) {
      return;
    }
    if(this.isServerDisconnected()){
      return;
    }
    this.socket.emit(SOCKET_EVENTS.CreateRoom,
      myUserId,
      (response: ServerEvent) => {
        if (response.status === 'ok') {
          this.joinRoom(myUserId, response.data as string, true);
        }
        this.pushServerAlertMsg(`${response.message}`);
      }
    );

  }

  joinRoom(myUserId: string, roomId: string, forceJoin = false) {

    if (this.roomConnected()) {
      return;
    }
    if(this.isServerDisconnected()){
      return;
    }
    console.log(myUserId, roomId);
    this.socket.emit(SOCKET_EVENTS.JoinRoom,
      myUserId, roomId, forceJoin,
      (response: ServerEvent) => {
        console.log(response);
        if(response.status === 'ok'){
          this.roomId.set(roomId);
        }
        this.pushServerAlertMsg(`${response.message}`);
      }
    );
  }

  setupNewMemberListener = false;
  getRoomJoinNotification(){
    if(!this.setupNewMemberListener){
      this.socket.on(SOCKET_EVENTS.RoomMemberUpdated, (members: string[]) => {
        console.log('new mems', members);
        console.log(this.members$.getValue());
        this.members$.next([...members]);
        console.log(this.members$.getValue());
      });
      this.setupNewMemberListener = true;
    }
    return this.members$.asObservable();
  }

  leaveRoom(myUserId: string) {
    if(this.isServerDisconnected(false)){
      return;
    }
    if(this.roomConnected()){
      this.socket.emit(SOCKET_EVENTS.LeaveRoom, myUserId, this.roomId(),
        (response: ServerEvent) => {
          if(response.status === 'ok'){
            this.roomId.set(null);
          }
        }
       );
    }
  }

  public sendMessage(message: string) {
    if(this.isServerDisconnected()){
      return;
    }
    const sender = this.authService.user();
    const roomId = this.roomId();
    if(roomId){
      const senderName = sender?.name ?? 'Unknown';
      const msg : UserMessage = {
        message: message,
        sentTime: new Date().toISOString(),
        sentTo: roomId,
        senderId: senderName,
        senderName: senderName
      }
      this.socket.emit(SOCKET_EVENTS.Message, msg,
        (response: ServerEvent) => {
          if(response.status === 'error'){
            this.serverAlerts$.next(`${response.message}`);
          }
        }
      );
      if(this.typing){
        setTimeout(() => {
          this.stopTyping(senderName);
        }, 500);
      }
    }
  }
  public getSocketServerEvents = () => {
    return this.serverAlerts$.asObservable();
  }

  private setupNewMessageListener = false;
  public getNewMessage = () => {
    if(!this.setupNewMessageListener){
      this.socket.on(SOCKET_EVENTS.Message, (message: UserMessage) => {
        console.log('new messgae', message);
        const newMsg : ChatMessageModel = this.getChatMsgFromUserMsg(message);
        this.previousMessages.push(newMsg);
        console.log(this.previousMessages);
        this.message$.next(message.message);
      });
      this.setupNewMessageListener = true;
    }
    return this.message$.asObservable();
  };

  typing = false;
  sendTypingNotification() {
    if(this.isServerDisconnected()){
      return;
    }
    const typerId = this.authService.user()?.name ?? 'Unknown';
    if (!this.roomConnected()) {
      return;
    }
    if (!this.typing) {
      this.typing = true;
      this.socket.emit(SOCKET_EVENTS.Typing, typerId, this.roomId());
    }

    let lastTypingTime = new Date().getTime();
    const timerlength = ChatConstants.TypingTimerLength;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDifference = timeNow - lastTypingTime;

      if ((timeDifference >= timerlength) && this.typing) {
        this.stopTyping(typerId);
      }
    }, timerlength);

  }

  stopTyping(typerId:string){
    this.socket.emit(SOCKET_EVENTS.StoppedTyping, typerId, this.roomId());
    this.typing = false;
  }

  public typing$: BehaviorSubject<string[]> = new BehaviorSubject(([] as string[]));
  setupTypingListener = false;
  public getTypingNotification = () => {
    const myUserId = this.authService.user()?.name;
    if (this.roomConnected() && !this.setupTypingListener){
      this.socket.on(SOCKET_EVENTS.Typing, (userId: string) => {
        if(userId !== myUserId){
          this.typing$.getValue();
          this.typing$.next([...new Set([userId,...this.typing$.getValue()])]);
        }
      });
      this.socket.on(SOCKET_EVENTS.StoppedTyping, (userId: string) => {
        if(userId !== myUserId){
          const currentTypingUsers = this.typing$.getValue().filter(e=> e!=userId);
          this.typing$.next([...new Set([...currentTypingUsers])]);
        }
      });
      this.setupTypingListener = true
    }

    return this.typing$.asObservable();
  };

  getChatMsgFromUserMsg(userMsg: UserMessage){
    const chatMsg : ChatMessageModel= {
      senderId: userMsg.senderId,
      senderName: userMsg.senderId,
      senderImgUrl: userMsg.senderImgUrl,
      sentTime: userMsg.sentTime,
      message: userMsg.message,
    }
    return chatMsg;

  }
}
