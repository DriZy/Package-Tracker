import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageListComponent } from './components/package-list/package-list.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: PackageListComponent },
  { path: 'packages', component: PackageListComponent },
  { path: 'deliveries', component: DeliveryListComponent },
  { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
