import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private apiUrl = 'http://localhost:3000/api/package';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  createPackage(pkg: Package): Observable<Package> {
    return this.http.post<Package>(this.apiUrl, pkg);
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
