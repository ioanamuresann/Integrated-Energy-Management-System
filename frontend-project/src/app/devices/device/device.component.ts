import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/shared/device.model';
import { DeviceService } from 'src/app/shared/device.service';
import { UserDto } from 'src/app/shared/dtos/user.dto';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  @Input() device = new Device('', '', '', '', '', '', new UserDto(''));
  editDeviceForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private deviceService: DeviceService) {
    this.editDeviceForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      maximumHourlyEnergyConsumption: ['', [Validators.required]],
    });
  }

  deleteDevice(deviceId: string): void {
    this.deviceService.deleteDevice(deviceId).subscribe(() => {
      alert('Device deleted successfully!');
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      // Set form values based on the current device
      this.editDeviceForm.patchValue({
        name: this.device.name,
        description: this.device.description,
        address: this.device.address,
        imageUrl: this.device.imageUrl,
        maximumHourlyEnergyConsumption: this.device.maximumHourlyEnergyConsumption,
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  onEditDevice(deviceId: string) {
    if (this.editDeviceForm.valid) {
      const updatedDeviceData = this.editDeviceForm.value;

      this.deviceService.updateDevice(deviceId, updatedDeviceData).subscribe(
        () => {
          alert('Device edited successfully!');
          this.isEditMode = false; // Exit edit mode after successful update
        },
        (error) => {
          console.error('Error editing device', error);
        }
      );
    }
  }
}
