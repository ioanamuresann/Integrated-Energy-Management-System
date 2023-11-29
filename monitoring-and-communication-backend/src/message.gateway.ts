import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server} from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:4200' }})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
   private readonly logger = new Logger(MessageGateway.name);
  
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('connected');
  }

  handleDisconnect() {
    console.log('disconnected');
  }
 
  @SubscribeMessage('sendMessage')
  handleSendMessage(userId: string): void {
    let message=['Limit exceeded for this device!', userId];
    this.server.emit('sendMessage',message);
  }

  // @SubscribeMessage('sendMessage')
  // handleSendMessage(userId: string): void {
  //     this.server.to(userId).emit('sendMessage', 'Limit exceeded for this device!');
  // }
}
