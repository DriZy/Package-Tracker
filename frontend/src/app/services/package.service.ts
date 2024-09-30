import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackageService {
  private apiUrl = '/api/packages';

  constructor(private http: HttpClient) {}

  createPackage(packageData: Package): Observable<Package> {
    return this.http.post<Package>(`${this.apiUrl}/mew`, packageData);
  }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  getPackageById(id: string) {
    return this.http.get<Package>(`${this.apiUrl}/${id}`);
  }

  updatePackage(id: string, packageData: Package): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/${id}`, packageData);
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
