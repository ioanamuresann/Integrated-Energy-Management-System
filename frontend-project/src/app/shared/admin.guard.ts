import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    
    if (this.userService.getCurrentlyLoggedUser().isAdmin) {
        return true; 
    } 
    else {
      alert("You don't have permission to access this page!");
      this.router.navigate(['/']);
      return false;
    }
}
}