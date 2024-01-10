import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export interface Message {
    content: string;
    sender: string;
    timestamp: Date;
    reciver: string;
    read: boolean;
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    handleMessage(socket: Socket, message: Message): void;
    handleTyping(socket: Socket, message: Message): void;
    handleSeen(socket: Socket, message: Message): void;
}
