import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PackageListComponent } from './components/package-list/package-list.component';
import { PackageDetailsComponent } from './components/package-details/package-details.component';
import { CreatePackageComponent } from './components/create-package/create-package.component';
import { DeliveryTrackingComponent } from './components/delivery-tracking/delivery-tracking.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'packages', component: PackageListComponent },
  { path: 'packages/:id', component: PackageDetailsComponent },
  { path: 'create-package', component: CreatePackageComponent },
  { path: 'track-delivery', component: DeliveryTrackingComponent },
  { path: '**', redirectTo: '' }  // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
