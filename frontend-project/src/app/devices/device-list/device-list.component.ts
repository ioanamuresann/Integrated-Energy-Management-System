import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/shared/device.model';
import { DeviceService } from 'src/app/shared/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit{
  
  deviceList!: Device[];

  isAddDeviceFormVisible: boolean = false;

  constructor(private deviceService: DeviceService){}

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe( (value: Device[]) => { this.deviceList = value ;
      console.log(this.deviceList);});
  }
 
  toggleAddDeviceForm() {
    this.isAddDeviceFormVisible = !this.isAddDeviceFormVisible;
  }
}
