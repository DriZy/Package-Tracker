import { Component } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Router } from '@angular/router';
import { Delivery } from '../../models/delivery.model';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  selector: 'app-delivery-create',
  templateUrl: './delivery-create.component.html',
  styleUrls: ['./delivery-create.component.scss']
})
export class DeliveryCreateComponent {
  delivery: Delivery = {
    delivery_id: '',
    package_id: '',
    status: 'open',
    from_location: { lat: 0, lng: 0 },
    to_location: { lat: 0, lng: 0 }
  };

  constructor(private deliveryService: DeliveryService, private router: Router) {}

  onSubmit() {
    this.deliveryService.createDelivery(this.delivery)
      .subscribe(() => {
        this.router.navigate(['/deliveries'])
          .then(r => console.log(r));
      });
  }

  onLocationSelected(location: { lat: number; lng: number }, isFrom: boolean) {
    if (isFrom) {
      this.delivery.from_location = location;
    } else {
      this.delivery.to_location = location;
    }
  }
}
