import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { ClientComponentComponent } from './client-component/client-component.component';
import { UsersComponent } from './users/users.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { MappingUserDeviceComponent } from './mapping-user-device/mapping-user-device.component';
import { AdminGuard } from './shared/admin.guard';
import { AuthGuard } from './shared/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { HistoricalEnergyComponent } from './historical-energy/historical-energy.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponentComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'devices', component: DeviceListComponent },
      { path: 'mapping', component: MappingUserDeviceComponent }
    ]
  },
  {
    path: 'client', component: HomePageComponent, canActivate: [AuthGuard],
    children: [
      { path: 'devices', component: ClientComponentComponent },
      { path: 'historical-energy', component: HistoricalEnergyComponent },
    ]
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
