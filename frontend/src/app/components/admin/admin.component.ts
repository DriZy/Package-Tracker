import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ModalComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  packages: any[] = [];
  deliveries: any[] = [];
  showModal = false;
  itemToDelete: { type: 'package' | 'delivery', id: string } | null = null;

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


  showDeleteModal(itemId: string, type: 'package' | 'delivery') {
    this.showModal = true;
    this.itemToDelete = { type, id: itemId };
  }

  proceedDelete() {
    if (this.itemToDelete) {
      if (this.itemToDelete.type === 'package') {
        this.deletePackage(this.itemToDelete.id);
      } else if (this.itemToDelete.type === 'delivery') {
        this.deleteDelivery(this.itemToDelete.id);
      }
    }
    this.cancelDelete();
  }

  deletePackage(packageId: string) {
    this.packages = this.packages.filter(pkg => pkg._id !== packageId);
  }

  deleteDelivery(deliveryId: string) {
    this.deliveries = this.deliveries.filter(del => del.delivery_id !== deliveryId);
  }

  cancelDelete() {
    this.showModal = false;
    this.itemToDelete = null;
  }
}
