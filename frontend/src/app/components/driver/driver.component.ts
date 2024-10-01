import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MapComponent],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  deliveryId: string = '';
  deliveryDetails: any = null;
  defaultLocation = { lat: 0, lng: 0 }; // Default location

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
      },
      (error) => console.error('Error fetching delivery:', error)
    );
  }

  updateStatus(newStatus: string) {
    const updatedDelivery = { ...this.deliveryDetails, status: newStatus };
    this.apiService.updateDelivery(this.deliveryId, updatedDelivery).subscribe(
      () => {
        this.websocketService.sendMessage({ delivery_id: this.deliveryId, status: newStatus });
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
