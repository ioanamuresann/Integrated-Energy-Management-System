import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../shared/device.service';

@Component({
  selector: 'app-mapping-user-device',
  templateUrl: './mapping-user-device.component.html',
  styleUrls: ['./mapping-user-device.component.scss']
})
export class MappingUserDeviceComponent {

  deviceID: string = '';
  newDeviceID: string = '';
  userID: string = '';
  connectionResult: string = '';
  connectForm: FormGroup = new FormGroup({});
  disconnectForm: FormGroup = new FormGroup({});

  constructor(private deviceService: DeviceService, 
              private formBuilder: FormBuilder) {

    this.connectForm = this.formBuilder.group({
      deviceID: ['', Validators.required],
      userID: ['', Validators.required],
    });

    this.disconnectForm = this.formBuilder.group({
      newDeviceID: ['', Validators.required]
    });
    
  }
  
  connectDevice() {
    if (this.deviceID && this.userID) {
      this.deviceService.associateUserWithDevice(this.userID, this.deviceID).subscribe(
        (result) => {
          if (result) {
            alert(
              'Device connected successfully!'
            );
          }
        },
        (error) => {
          console.error('Error:', error); 
          alert(
            `An error occurred` 
          );
        }
      );
    }
  }

  disconnectDevice() {
    if (this.newDeviceID) {
      this.deviceService.disconnectDeviceFromUser(this.newDeviceID).subscribe(
        (result) => {
          if (result) {
            alert(
              'Device disconnected successfully!'
            );
          } else {
            alert(
              `An error occurred` 
            );
          }
        }
      );
    }
  }
}
