import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: L.Map;

  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [0, 0], // Set to an initial center
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
      this.locationSelected.emit(selectedLocation); // Emit selected location
      this.addMarker(event.latlng);
    });
  }

  addMarker(latlng: L.LatLng): void {
    L.marker(latlng).addTo(this.map).bindPopup('Selected Location').openPopup();
  }
}
