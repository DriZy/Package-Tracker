import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Delivery } from '../../models/delivery.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {DeliveryStatus} from "../../common/enums";
import {MapComponent} from "../map/map.component";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MapComponent],
  selector: 'app-delivery-create',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  delivery: Delivery = {
    pickup_time: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    package_id: '',
    status: 'open',
  };
  isEditMode = false;
  deliveryStatusEnum = DeliveryStatus;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const deliveryId = this.route.snapshot.paramMap.get('id');
    if (deliveryId) {
      this.isEditMode = true;
      this.fetchDeliveryDetails(deliveryId);
    }
  }

  fetchDeliveryDetails(id: string): void {
    this.apiService.getDeliveryById(id).subscribe(
      (data: Delivery) => {
        this.delivery = data;
      },
      (error) => console.error('Error fetching delivery details:', error)
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.apiService.updateDelivery(this.delivery.package_id, this.delivery)
        .subscribe(() => {
          this.router.navigate(['/admin'])
            .then(r => console.log('Delivery updated successfully!'));
        });
    } else {
      // Create a new delivery
      this.apiService.createDelivery(this.delivery)
        .subscribe(() => {
          this.router.navigate(['/admin'])
            .then(r => console.log('Delivery created successfully!'));
        });
    }
  }

  startLocationUpdates() {
    console.log('Location updates started.');
  }

  stopLocationUpdates() {
    console.log('Location updates stopped.');
  }

  onLocationSelected(location: { lat: number; lng: number }) {
    console.log('Selected location:', location);
  }
}
