import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { io } from "socket.io-client";
import { UserService } from '../shared/user.service';
import { ChatService } from '../chat/chat.service';
import { Message } from '../chat/chat.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
    
   socket = io("http://localhost:3002");
   loggedUser = this.userService.getCurrentlyLoggedUser();
   displayUser = false;

   constructor( private router: Router,
                private userService: UserService,
                private chatService: ChatService ){}

    navigateToDevices(){
      this.router.navigate(['/client/devices']);
    }

    ngOnInit(): void {
    
    //websockets
    this.socket.on("connect", () => {
      console.log('connect');
    });
    this.socket.on("sendMessage", (message: any) => {
     if(this.loggedUser.id === message[1])
     alert(message[0]);
    });
    
    //chat
    this.chatService.getNewMessages().subscribe((message: Message) => {
      if(message.reciver === this.loggedUser.name)
        alert('New message from ' + message.sender);
    });

    }

    displayUserInfo() {
     this.displayUser = !this.displayUser;
    }

    navigateToHistoricalEnergy(){
      this.router.navigate(['/client/historical-energy']);
    }

    chatWithAdmin() {
      this.router.navigate(['/client/chat']);
    }
}
