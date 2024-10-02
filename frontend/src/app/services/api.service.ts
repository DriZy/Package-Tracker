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
    return this.http.post<Package>(`${this.apiUrl}/package/new`, packageData, {headers: this.getHeaders()});
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

    return this.http.get<Package[]>(`${this.apiUrl}/package`, {headers: this.getHeaders(), params});
  }

  getPackageById(id: string) {
    return this.http.get<Package>(`${this.apiUrl}/package/${id}`, {headers: this.getHeaders()});
  }

  updatePackage(id: string, packageData: Package): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/package/${id}`, packageData, {headers: this.getHeaders()});
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/package/${id}`, {headers: this.getHeaders()});
  }

  getDeliveries(queryParams: Record<string, any> | null = null): Observable<Delivery[]> {
    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        const value = queryParams[key];
        if (value !== null && value !== undefined) {
          params = params.append(key, value.toString());
        }
      });
    }

    return this.http.get<Delivery[]>(`${this.apiUrl}/delivery`, {headers: this.getHeaders(), params});
  }

  createDelivery(deliveryData: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/delivery/new`, deliveryData, {headers: this.getHeaders()});
  }

  getDeliveryById(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/delivery/${id}`, {headers: this.getHeaders()});
  }

  updateDelivery(id: string, deliveryData: Delivery): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/delivery/${id}`, deliveryData, {headers: this.getHeaders()});
  }

  deleteDelivery(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delivery/${id}`, {headers: this.getHeaders()});
  }
}
