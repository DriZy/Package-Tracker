import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Package} from "../models/package.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Delivery} from "../models/delivery.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  private tokenKey = 'authToken';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  createPackage(packageData: Package): Observable<Package> {
    return this.http.post<Package>(`${this.apiUrl}/packages/new`, packageData, {headers: this.getHeaders()});
  }

  getPackages(queryParams: Record<string, any> | null = null): Observable<Package[]> {
    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        const value = queryParams[key]; // Safely access the value
        if (value !== null && value !== undefined) {
          params = params.append(key, value.toString()); // Ensure it's converted to string
        }
      });
    }

    return this.http.get<Package[]>(`${this.apiUrl}/packages`, {headers: this.getHeaders(), params});
  }

  getPackageById(id: string) {
    return this.http.get<Package>(`${this.apiUrl}/packages/${id}`, {headers: this.getHeaders()});
  }

  updatePackage(id: string, packageData: Package): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/packages/${id}`, packageData, {headers: this.getHeaders()});
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/packages/${id}`, {headers: this.getHeaders()});
  }

  getDeliveries(queryParams: Record<string, any> | null = null): Observable<Delivery[]> {
    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        const value = queryParams[key]; // Safely access the value
        if (value !== null && value !== undefined) {
          params = params.append(key, value.toString()); // Ensure it's converted to string
        }
      });
    }

    return this.http.get<Delivery[]>(`${this.apiUrl}/deliveries`, {headers: this.getHeaders(), params});
  }

  createDelivery(deliveryData: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/deliveries/new`, deliveryData, {headers: this.getHeaders()});
  }

  getDeliveryById(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/deliveries/${id}`, {headers: this.getHeaders()});
  }

  updateDelivery(id: string, deliveryData: Delivery): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/deliveries/${id}`, deliveryData, {headers: this.getHeaders()});
  }

  deleteDelivery(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deliveries/${id}`, {headers: this.getHeaders()});
  }
}
