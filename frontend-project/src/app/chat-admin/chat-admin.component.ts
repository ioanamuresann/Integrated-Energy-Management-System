import { Component, ViewChild } from '@angular/core';
import { Message } from '../chat/chat.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ChatService } from '../chat/chat.service';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.scss']
})
export class ChatAdminComponent {
  newMessage$!: Observable<Message>;
  messages: Message[] = [];
  sender: string = '';
  receiver: string = '';
  conversations: { receiver: string, messages: Message[] }[] = [];
  conversationForms: { [key: string]: FormGroup } = {};

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.userService.getCurrentlyLoggedUser().isAdmin) {
      this.chatService.getNewMessages().subscribe((message: Message) => {
        let currentConversation = this.conversations.find(conv => conv.receiver === message.sender);
        this.receiver = message.sender;

        if (!currentConversation && message.sender !== this.userService.getCurrentlyLoggedUser().name) {
          currentConversation = { receiver: message.sender, messages: [] };
          this.conversations.push(currentConversation);
        }
        if(currentConversation)
          currentConversation.messages.push(message);
      this.sender = '';
      });

    }

    this.chatService.isTyping().subscribe((message: Message) => {
      if(message.reciver === this.userService.getCurrentlyLoggedUser().name)
        this.sender = message.sender;
    });
  }

  getForm(receiver: string): FormGroup {
    if (!this.conversationForms[receiver]) {
      this.conversationForms[receiver] = this.fb.group({
        message: ['', Validators.required]
      });
    }
    return this.conversationForms[receiver];
  }

  onSubmit(receiver: string) {
    const { message } = this.getForm(receiver).value;
    if (!message) return;

    const newMessage: Message = {
      content: message,
      sender: this.userService.getCurrentlyLoggedUser().name,
      timestamp: new Date(),
      reciver: receiver,
      read: false
    };

    if (this.userService.getCurrentlyLoggedUser().isAdmin) {
      this.chatService.sendMessage(newMessage);

      let currentConversation = this.conversations.find(conv => conv.receiver === receiver);

      if (!currentConversation) {
        currentConversation = { receiver: receiver, messages: [newMessage] };
        this.conversations.push(currentConversation);
      } else {
        currentConversation.messages.push(newMessage);
      }
    }

    this.getForm(receiver).reset();
  }

  onInputChange(event: Event,receiver: string) {
    this.chatService.emitTyping(
      {
        sender: this.userService.getCurrentlyLoggedUser().name,
        reciver: receiver,
        timestamp: new Date(),
        content: '',
        read: false
      }
    )
  }

  markAsRead(message: Message): void {
    message.read = true;
    console.log(message);
    this.chatService.emitSeen(message);
  }
}