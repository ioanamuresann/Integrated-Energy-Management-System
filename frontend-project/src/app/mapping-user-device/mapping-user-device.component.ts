import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../shared/device.service';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Device } from '../shared/device.model';


@Component({
  selector: 'app-mapping-user-device',
  templateUrl: './mapping-user-device.component.html',
  styleUrls: ['./mapping-user-device.component.scss'],
})
export class MappingUserDeviceComponent implements OnInit {
  selectedUserID: string = '';
  connectionResult: string = '';
  connectForm: FormGroup = new FormGroup({});
  disconnectForm: FormGroup = new FormGroup({});
  users: User[] = []; 
  devices: Device[] = [];
  selectedDeviceID: any;
  selectedDisconnectDeviceID: any;

  constructor(private deviceService: DeviceService, private formBuilder: FormBuilder,
              private userService: UserService) {
    this.connectForm = this.formBuilder.group({
      deviceID: ['', Validators.required],
      userID: ['', Validators.required],
    });

    this.disconnectForm = this.formBuilder.group({
      newDeviceID: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadDevices();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  loadDevices(): void {
    this.deviceService.getAllDevices().subscribe(
      (devices) => {
        this.devices = devices;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  connectDevice() {
    if (this.selectedDeviceID && this.selectedUserID) {
      this.deviceService.associateUserWithDevice(this.selectedUserID, this.selectedDeviceID).subscribe(
        (result) => {
          if (result) {
            alert('Device connected successfully!');
          }
        },
        (error) => {
          console.error('Error:', error);
          alert(`An error occurred`);
        }
      );
    }
  }

  disconnectDevice() {
    if (this.selectedDisconnectDeviceID) {
      this.deviceService.disconnectDeviceFromUser(this.selectedDisconnectDeviceID).subscribe(
        (result) => {
          if (result) {
            alert('Device disconnected successfully!');
          } else {
            alert(`An error occurred`);
          }
        }
      );
    }
  }
}
