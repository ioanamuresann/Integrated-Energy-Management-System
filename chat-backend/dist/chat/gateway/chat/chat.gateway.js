"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    handleConnection(socket) {
        console.log('Client connected:', socket.id);
    }
    handleDisconnect(socket) {
        console.log('Client disconnected:', socket.id);
    }
    handleMessage(socket, message) {
        const messageWithMetadata = {
            content: message.content,
            sender: message.sender,
            timestamp: new Date(),
            reciver: message.reciver,
            read: false
        };
        this.server.emit('newMessage', messageWithMetadata);
    }
    handleTyping(socket, message) {
        const messageWithMetadata = {
            content: message.content,
            sender: message.sender,
            timestamp: new Date(),
            reciver: message.reciver,
            read: false
        };
        this.server.emit('typing', message);
    }
    handleSeen(socket, message) {
        const messageWithMetadata = {
            content: message.content,
            sender: message.sender,
            timestamp: new Date(),
            reciver: message.reciver,
            read: true
        };
        this.server.emit('seen', message);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typingMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('seenMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleSeen", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: ['http://localhost:4200'] } })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map