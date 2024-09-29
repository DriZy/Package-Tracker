import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private apiUrl = 'http://localhost:3000/api/delivery';

  constructor(private http: HttpClient) {}

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.apiUrl, delivery);
  }

  deleteDelivery(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
