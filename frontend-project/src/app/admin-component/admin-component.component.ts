import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent {
  constructor(private router: Router) {}

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
}
