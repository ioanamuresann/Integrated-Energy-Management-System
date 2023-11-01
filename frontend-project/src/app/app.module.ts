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
    HomePageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
