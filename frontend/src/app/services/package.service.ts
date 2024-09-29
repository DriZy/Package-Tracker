import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private apiUrl = 'http://localhost:3000/api';  // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/packages`);
  }

  getPackageById(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/packages/${id}`);
  }

  createPackage(packageData: Package): Observable<Package> {
    return this.http.post<Package>(`${this.apiUrl}/packages`, packageData);
  }

  trackDelivery(packageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/delivery/${packageId}`);
  }
}
