import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.model';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe((data) => {
      this.deliveries = data;
    });
  }
}
