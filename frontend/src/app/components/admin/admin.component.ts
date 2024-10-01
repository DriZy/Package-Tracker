import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  packages: any[] = [];
  deliveries: any[] = [];
  showModal = false;
  packageToDelete: string | null = null;
  deliveryToDelete: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadPackages();
    this.loadDeliveries();
  }

  loadPackages() {
    this.apiService.getPackages().subscribe((data) => (this.packages = data));
  }

  loadDeliveries() {
    this.apiService.getDeliveries().subscribe((data) => (this.deliveries = data));
  }

  editPackage(id: string) {
    this.router.navigate([`/admin/packages/${id}/edit`]);
  }

  createPackage() {
    this.router.navigate([`/admin/create-package`]);
  }

  editDelivery(id: string) {
    this.router.navigate([`/admin/deliveries/${id}/edit`]);
  }

  createDelivery() {
    this.router.navigate([`/admin/create-delivery`]);
  }

  showDeleteModal(packageId: string) {
    this.packageToDelete = packageId;
    this.showModal = true;
  }

  proceedDelete() {
    if (this.packageToDelete) {
      this.apiService.deletePackage(this.packageToDelete).subscribe(() => {
        this.packages = this.packages.filter(pkg => pkg.package_id !== this.packageToDelete);
        this.packageToDelete = null;
        this.showModal = false;
      }, error => {
        console.error('Error deleting package:', error);
        this.showModal = false;
      });
    }else if(this.deliveryToDelete) {

      this.apiService.deleteDelivery(this.deliveryToDelete).subscribe(() => {
        this.deliveries = this.deliveries.filter(del => del.delivery_id !== this.deliveryToDelete);
        this.deliveryToDelete = null;
        this.showModal = false;
      }, error => {
        console.error('Error deleting delivery:', error);
        this.showModal = false;
      });
    }else {
      console.log('No package or delivery to delete');
    }
  }

  cancelDelete() {
    this.packageToDelete = null;
    this.deliveryToDelete = null;
    this.showModal = false;
  }
}
