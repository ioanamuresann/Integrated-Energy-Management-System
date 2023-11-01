import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.getCurrentlyLoggedUser().id !== '') {
        return true; 
    } else {
      alert("You need to login first!");
      // Redirect to the landing page
      this.router.navigate(['/']);
      return false;
    }
}
}