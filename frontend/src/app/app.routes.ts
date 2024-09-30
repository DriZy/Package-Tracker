import { Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./guards/auth.guard";
import {PackageCreateComponent} from "./components/package-create/package-create.component";
import {PackageUpdateComponent} from "./components/package-update/package-update.component";
import {PackageListComponent} from "./components/package-list/package-list.component";
import {DeliveryCreateComponent} from "./components/delivery-create/delivery-create.component";
import {DeliveryUpdateComponent} from "./components/delivery-update/delivery-update.component";
import {DeliveryListComponent} from "./components/delivery-list/delivery-list.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'packages', component: PackageListComponent, canActivate: [AuthGuard] },
  { path: 'packages/new', component: PackageCreateComponent, canActivate: [AuthGuard] },
  { path: 'packages/:id/edit', component: PackageUpdateComponent, canActivate: [AuthGuard] },
  { path: 'deliveries', component: DeliveryListComponent, canActivate: [AuthGuard] },
  { path: 'deliveries/new', component: DeliveryCreateComponent, canActivate: [AuthGuard] },
  { path: 'deliveries/:id', component: DeliveryUpdateComponent, canActivate: [AuthGuard] },
];
