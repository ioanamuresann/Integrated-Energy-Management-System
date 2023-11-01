import { Component } from '@angular/core';
import { Device } from '../shared/device.model';
import { DeviceService } from '../shared/device.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-client-component',
  templateUrl: './client-component.component.html',
  styleUrls: ['./client-component.component.scss']
})
export class ClientComponentComponent {
  userDevices: Device[] = [];

  constructor(private deviceService: DeviceService, private userService: UserService) {}

  ngOnInit() {
    
    const userId = this.userService.getCurrentlyLoggedUser().id;
    console.log(userId);

    this.deviceService.getUserDevices(userId).subscribe(
      (devices: Device[]) => {
        this.userDevices = devices;
      }
    );

    console.log(this.userDevices);
  }
}
