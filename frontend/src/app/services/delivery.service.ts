import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private apiUrl = '/api/deliveries';

  constructor(private http: HttpClient) {}

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  createDelivery(deliveryData: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/new`, deliveryData);
  }
  getDeliveryById(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${id}`);
  }
  updateDelivery(id: string, deliveryData: Delivery): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, deliveryData);
  }

  deleteDelivery(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
