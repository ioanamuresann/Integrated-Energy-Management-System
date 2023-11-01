import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/shared/device.service';


@Component({
  selector: 'app-add-device-form',
  templateUrl: './add-device-form.component.html',
  styleUrls: ['./add-device-form.component.scss']
})
export class AddDeviceFormComponent {
  addDeviceForm: FormGroup;

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              ) {
    this.addDeviceForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      maximumHourlyEnergyConsumption: ['', [Validators.required]],
    });
  }

  onAddDevice() {
    if (this.addDeviceForm.valid) {
      const deviceData = this.addDeviceForm.value;

      this.deviceService.createDevice(deviceData).subscribe(
        () => {
          alert(
            'Device added successfully!'
          );
        },
        (error) => {
          console.error('Error adding device', error);
        }
      );
    }
  }
}
