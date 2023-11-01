import { Component, Input } from '@angular/core';
import { Device } from 'src/app/shared/device.model';
import { DeviceService } from 'src/app/shared/device.service';
import { UserDto } from 'src/app/shared/dtos/user.dto';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  @Input() device= new Device('','','','','','',new UserDto(''));

  constructor(private deviceService: DeviceService){}

  deleteDevice(deviceId: string): void {
    this.deviceService.deleteDevice(deviceId).subscribe(() =>
     { alert(
      'Device deleted successfully!'
    );}
    );
    
  }
}
