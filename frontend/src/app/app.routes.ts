import { Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {TrackerComponent} from "./components/tracker/tracker.component";
import {DriverComponent} from "./components/driver/driver.component";
import {AdminComponent} from "./components/admin/admin.component";
import {PackageComponent} from "./components/package/package.component";
import {DeliveryComponent} from "./components/delivery/delivery.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/create-package', component: PackageComponent, canActivate: [AuthGuard] },
  { path: 'admin/create-delivery', component: DeliveryComponent, canActivate: [AuthGuard] },
  { path: 'admin/packages/:id/edit', component: PackageComponent, canActivate: [AuthGuard] },
  { path: 'admin/deliveries/:id/edit', component: DeliveryComponent, canActivate: [AuthGuard] },
  { path: 'driver', component: DriverComponent, canActivate: [AuthGuard] },
  { path: 'tracker', component: TrackerComponent, canActivate: [AuthGuard] },
];
