import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { ClientComponentComponent } from './client-component/client-component.component';
import { UsersComponent } from './users/users.component';
import { DeviceComponent } from './devices/device/device.component';
import { AddDeviceFormComponent } from './devices/add-device-form/add-device-form.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DevicesComponent } from './devices/devices.component';
import { MappingUserDeviceComponent } from './mapping-user-device/mapping-user-device.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HistoricalEnergyComponent } from './historical-energy/historical-energy.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AdminComponentComponent,
    ClientComponentComponent,
    UsersComponent,
    DeviceComponent,
    DevicesComponent,
    AddDeviceFormComponent,
    DeviceListComponent,
    MappingUserDeviceComponent,
    HomePageComponent,
    HistoricalEnergyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
