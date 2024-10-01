import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PackageService {
  private baseUrl = `${environment.apiBaseUrl}/packages`;
  private tokenKey = 'authToken';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  }

  constructor(private http: HttpClient, private router: Router) {}

  createPackage(packageData: Package): Observable<Package> {
    return this.http.post<Package>(`${this.baseUrl}/new`, packageData, { headers: this.getHeaders() });
  }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getPackageById(id: string) {
    return this.http.get<Package>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  updatePackage(id: string, packageData: Package): Observable<Package> {
    return this.http.put<Package>(`${this.baseUrl}/${id}`, packageData, { headers: this.getHeaders() });
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
