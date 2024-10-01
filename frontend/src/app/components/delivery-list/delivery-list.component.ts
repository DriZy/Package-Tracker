import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Delivery } from '../../models/delivery.model';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private ApiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.apiService.getDeliveries()
      .subscribe((data) => {
        this.deliveries = data;
        this.router.navigate(['/deliveries'])
          .then(r => console.log(r));
      });
  }

  deleteDelivery(id: string) {
    this.apiService.deleteDelivery(id)
      .subscribe(() => {
      this.loadDeliveries(); // Reload deliveries after deletion
    });
  }

  viewDetails(id: string) {
    this.router.navigate([`/deliveries/${id}/details`]);
  }

  editDelivery(id: string) {
    this.router.navigate([`/deliveries/${id}/edit`]);
  }

  createPackage() {
    this.router.navigate([`/deliveries/new`]);
  }
}
