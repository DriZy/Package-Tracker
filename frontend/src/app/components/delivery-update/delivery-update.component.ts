import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Delivery } from '../../models/delivery.model';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MapComponent} from "../map/map.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  selector: 'app-delivery-update',
  templateUrl: './delivery-update.component.html',
  styleUrls: ['./delivery-update.component.scss']
})
export class DeliveryUpdateComponent implements OnInit {
  delivery: Delivery = {
    delivery_id: '',
    package_id: '',
    status: 'open',
    from_location: { lat: 0, lng: 0 },
    to_location: { lat: 0, lng: 0 }
  }

  constructor(private deliveryService: DeliveryService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deliveryService.getDeliveryById(id).subscribe(data => {
        this.delivery = data;
      });
    }
  }


  onSubmit() {
    this.deliveryService.updateDelivery(this.delivery.delivery_id, this.delivery)
      .subscribe(() => {
        this.router.navigate(['/deliveries'])
          .then(r => console.log(r));
      });
  }

  onLocationSelected(location: { lat: number; lng: number }, isFrom: boolean) {
    if (isFrom) {
      this.delivery!.from_location = location;
    } else {
      this.delivery!.to_location = location;
    }
  }
}
