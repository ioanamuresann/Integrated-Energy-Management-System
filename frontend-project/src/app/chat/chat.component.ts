import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
export interface Message {
  content: string;
  sender: string;
  timestamp: Date;
  reciver: string;
  read: boolean;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  newMessage$!: Observable<Message>;
  messages: Message[] = [];
  users: User[] = [];
  sender: string = '';
  currentLoggedUser = '';
  @ViewChild('form') form!: NgForm;
  constructor(private chatService: ChatService, private  userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentLoggedUser = this.userService.getCurrentlyLoggedUser().name;
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users.filter(user => user.isAdmin);
    });
    this.chatService.getNewMessages().subscribe((message: Message) => {
      if (message.sender === this.userService.getCurrentlyLoggedUser().name || this.users.find(user => user.name === message.sender) &&
        message.reciver === this.userService.getCurrentlyLoggedUser().name)
        this.messages.push(message);
        this.sender = '';
    }
    );

    this.chatService.isTyping().subscribe((message: Message) => {
      if(message.reciver === this.userService.getCurrentlyLoggedUser().name)
        this.sender = message.sender;
    });
    
    this.chatService.isSeen().subscribe((message: Message) => {
      const index = this.messages.findIndex(msg => msg.content === message.content && msg.sender === message.sender && msg.reciver === message.reciver && msg.timestamp);
      if (index !== -1) {
        this.messages[index].read = true;
        this.cdr.detectChanges(); 
      }
    });
  }


  onSubmit() {
    const { message } = this.form.value;
    if (!message) return;
    const newMessage: Message = {
      content: message,
      sender: this.userService.getCurrentlyLoggedUser().name,
      timestamp: new Date(),
      reciver: this.users[0].name,
      read: false
    };
    if (!this.userService.getCurrentlyLoggedUser().isAdmin) {
      this.chatService.sendMessage(newMessage);
    }
    this.form.reset();
  }

  onInputChange(event: Event) {
    this.chatService.emitTyping(
      {
        sender: this.userService.getCurrentlyLoggedUser().name,
        reciver: this.users[0].name,
        timestamp: new Date(),
        content: '',
        read: false
      }
    )
  }

} 
