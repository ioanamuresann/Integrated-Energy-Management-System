import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ChatService } from '../chat/chat.service';
import { Message } from '../chat/chat.component';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent implements OnInit {

  loggedUser = this.userService.getCurrentlyLoggedUser();

  constructor(private router: Router,
    private userService: UserService,
    private chatService: ChatService) { }

  navigateToUsers() {
    this.router.navigate(['/admin/users']);
  }

  navigateToDevices() {
    this.router.navigate(['/admin/devices']);
  }

  navigateToMapping() {
    this.router.navigate(['/admin/mapping']);
  }

  logout() {
    this.router.navigate(['']);
  }

  chatWithUsers() {
    this.router.navigate(['/admin/chat']);
  }

  ngOnInit(): void {

    //chat
    this.chatService.getNewMessages().subscribe((message: Message) => {
      if (message.reciver === this.loggedUser.name)
        alert('New message from ' + message.sender);
    });

  }

}

