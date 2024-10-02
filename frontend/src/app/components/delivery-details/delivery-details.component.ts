import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Delivery } from '../../models/delivery.model';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  delivery: Delivery | null = null;

  constructor( private ApiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchDeliveryDetails(id);
    }
  }

  fetchDeliveryDetails(id: string) {
    this.ApiService.getDeliveryById(id).subscribe(
      (data: Delivery) => {
        this.delivery = data;
      },
      (error) => {
        console.error('Error fetching delivery details:', error);
      }
    );
  }

  editDelivery(id: string) {
    this.router.navigate([`/deliveries/${id}/edit`]);
  }
}
