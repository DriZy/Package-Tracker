import { Component, EventEmitter, Output, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: L.Map | null = null;

  @Input() location: { lat: number; lng: number } | null = null;
  @Output() locationOutput = new EventEmitter<{ lat: number; lng: number }>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  initMap(): void {
    import('leaflet').then((L) => {
      this.map = L.map('map', {
        center: [0, 0],
        zoom: 2
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);

      this.map.on('click', (event: L.LeafletMouseEvent) => {
        const selectedLocation = {
          lat: event.latlng.lat,
          lng: event.latlng.lng
        };
        this.locationOutput.emit(selectedLocation);
        this.addMarker(event.latlng);
      });

      if (this.location) {
        this.map.setView([this.location.lat, this.location.lng], 13);
        this.addMarker(L.latLng(this.location.lat, this.location.lng));
      }
    }).catch((error) => {
      console.error('Error loading Leaflet:', error);
    });
  }

  addMarker(latlng: L.LatLng): void {
    if (this.map) {
      import('leaflet').then((L) => {
        // @ts-ignore
        L.marker(latlng).addTo(this.map).bindPopup('Selected Location').openPopup();
      });
    }
  }

  onMapClick(event: any) {
    const selectedLocation = { lat: event.lat, lng: event.lng };
    this.locationOutput.emit(selectedLocation);
  }
}
