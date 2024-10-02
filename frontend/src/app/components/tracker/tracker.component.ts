import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { WebsocketService } from '../../services/websocket.service';
import {FormsModule} from "@angular/forms";
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Package} from "../../models/package.model";
import {Delivery} from "../../models/delivery.model";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MapComponent],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit  {
  packageId: string = '';
  packageDetails: Package | null = null;
  status: string = '';
  deliveryDetails: any[] = []; // Array to hold delivery details

  constructor(
    private apiService: ApiService,
    private websocketService: WebsocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.watchPosition((position) => {
        if (this.packageDetails) {
          const locationUpdate = {
            _id: this.packageId,
            location: `${position.coords.latitude}, ${position.coords.longitude}`
          };
          this.websocketService.sendMessage(locationUpdate);
        }
      });
    }
  }

  trackPackage() {
    this.apiService.getPackageById(this.packageId).subscribe(
      (data) => {
        this.packageDetails = data;
        this.status = data.status;

        // Fetch deliveries after getting package details
        this.apiService.getDeliveries().subscribe((deliveries) => {
          this.deliveryDetails = deliveries.filter(delivery => delivery.package_id === this.packageId);
        });
      },
      (error) => console.error('Error fetching package:', error)
    );
    this.websocketService.getMessages()!.subscribe((message) => {
      if (message.package_id === this.packageId) {
        this.status = message.status;
      }
    });
  }

  onLocationSelected(location: { lat: number; lng: number }) {
    console.log('Selected location:', location);
  }
}
