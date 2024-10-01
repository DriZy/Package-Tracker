import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private apiUrl = `${environment.apiBaseUrl}/packages`;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createDelivery(deliveryData: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/new`, deliveryData, { headers: this.getHeaders() });
  }

  getDeliveryById(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateDelivery(id: string, deliveryData: Delivery): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, deliveryData, { headers: this.getHeaders() });
  }

  deleteDelivery(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
