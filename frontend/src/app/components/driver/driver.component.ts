import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import {DeliveryStatus} from "../../common/enums";

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MapComponent],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  protected readonly DeliveryStatus = DeliveryStatus;

  deliveryId: string = '';
  deliveryDetails: any = null;
  packageDetails: any = null;
  defaultLocation = { lat: 0, lng: 0 }; // Default location
  buttonStatus = {
    pickedUp: false,
    inTransit: false,
    delivered: false,
    failed: false,
  };

  constructor(
    private apiService: ApiService,
    private websocketService: WebsocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.watchPosition((position) => {
        if (this.deliveryDetails) {
          const locationUpdate = {
            delivery_id: this.deliveryId,
            location: `${position.coords.latitude}, ${position.coords.longitude}`
          };
          this.websocketService.sendMessage(locationUpdate);
        }
      });
    }
  }

  loadDelivery() {
    this.apiService.getDeliveryById(this.deliveryId).subscribe(
      (data) => {
        this.deliveryDetails = data;
        if (!this.deliveryDetails.location) {
          this.deliveryDetails.location = this.defaultLocation; // Set default location if undefined or null
        }
        // Fetch package details by package ID
        this.apiService.getPackageById(this.deliveryDetails.package_id).subscribe(
          (packageData) => {
            this.packageDetails = packageData; // Store the package details
          },
          (error) => console.error('Error fetching package details:', error)
        );
        this.updateButtonStatus
      },
      (error) => console.error('Error fetching delivery:', error)
    );
  }

  updateButtonStatus() {
    // Reset button statuses
    this.buttonStatus = {
      pickedUp: false,
      inTransit: false,
      delivered: false,
      failed: false,
    };

    switch (this.deliveryDetails.status) {
      case DeliveryStatus.Open:
        this.buttonStatus.pickedUp = true; // Enable "Picked Up" button
        break;
      case DeliveryStatus.PickedUp:
        this.buttonStatus.inTransit = true; // Enable "In Transit" button
        break;
      case DeliveryStatus.InTransit:
        this.buttonStatus.delivered = true; // Enable "Delivered" button
        this.buttonStatus.failed = true; // Enable "Failed" button
        break;
      default:
        break;
    }
  }

  updateStatus(newStatus: DeliveryStatus) {
    const updatedDelivery = { ...this.deliveryDetails, status: newStatus, updatedAt: new Date() }; // Add timestamp

    const currentTime = new Date();
    if (newStatus === DeliveryStatus.PickedUp) {
      updatedDelivery.picked_up = currentTime;
    } else if (newStatus === DeliveryStatus.InTransit) {
      updatedDelivery.start_time = currentTime;
    } else if (newStatus === DeliveryStatus.Delivered) {
      updatedDelivery.end_time = currentTime;
    } else if (newStatus === DeliveryStatus.Failed) {
      updatedDelivery.end_time = currentTime;
    }

    this.apiService.updateDelivery(this.deliveryId, updatedDelivery).subscribe(
      () => {
        this.websocketService.sendMessage({ delivery_id: this.deliveryId, status: newStatus, ...updatedDelivery });
        this.deliveryDetails.status = newStatus;
        this.updateButtonStatus();
      },
      (error) => console.error('Error updating delivery status:', error)
    );
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
