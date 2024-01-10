import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from './chat.component';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:Socket,private authService: AuthService) { }

  connectToWebSocket(): void {
    const token = this.authService.getAccessToken();
    this.socket.ioSocket.io.opts.query = { token };
    console.log('socket.ioSocket.io.opts.query',this.socket.ioSocket.io.opts.query);
    this.socket.connect();
  }

  sendMessage(message: Message) {
    this.socket.emit('sendMessage', message);
  }

  getNewMessages(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  isTyping(): Observable<Message> {
    return this.socket.fromEvent<Message>('typing');
  }

  emitTyping(message: Message) {
    this.socket.emit('typingMessage', message);
  }

  emitSeen(message: Message) {
    this.socket.emit('seenMessage', message);
  }

  isSeen(): Observable<Message> {
    return this.socket.fromEvent<Message>('seen');
  }

}
