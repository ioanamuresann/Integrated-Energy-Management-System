import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export interface Message {
  content: string;
  sender: string;
  timestamp: Date;
  reciver: string;
  read: boolean;
}

@WebSocketGateway({ cors: {origin: ['http://localhost:4200']}})
export class ChatGateway implements  OnGatewayConnection, OnGatewayDisconnect{
 
 @WebSocketServer() server: Server;
 

 handleConnection(socket: Socket) {
  console.log('Client connected:', socket.id);
}

 handleDisconnect(socket: Socket) {
  console.log('Client disconnected:', socket.id);
}

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket,message: Message): void {
    const messageWithMetadata: Message = {
      content: message.content,
      sender: message.sender,
      timestamp: new Date(),
      reciver: message.reciver,
      read: false
    };
    this.server.emit('newMessage', messageWithMetadata);
  }
  
  @SubscribeMessage('typingMessage')
  handleTyping(socket: Socket, message: Message): void {
    const messageWithMetadata: Message = {
      content: message.content,
      sender: message.sender,
      timestamp: new Date(),
      reciver: message.reciver,
      read: false
    };
    this.server.emit('typing', message);
  }

  @SubscribeMessage('seenMessage')
  handleSeen(socket: Socket, message: Message): void {
    const messageWithMetadata: Message = {
      content: message.content,
      sender: message.sender,
      timestamp: new Date(),
      reciver: message.reciver,
      read: true
    };
    this.server.emit('seen', message);
  }

}
