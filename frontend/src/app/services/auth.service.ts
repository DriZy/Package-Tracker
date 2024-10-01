import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'; // Adjust the path as necessary

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';
  private baseUrl = environment.apiBaseUrl;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json', // Set Content-Type to application/json
    });
  }

  constructor(private http: HttpClient, private router: Router) {}

  async signup(credentials: { username: string; password: string }) {
    const result = await this.http.post(`${this.baseUrl}/users/signup`, credentials, {headers: this.getHeaders()})
      .subscribe((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/packages']);
      });
  }

  login(credentials: { password: string; username: string }) {
    return this.http.post(`${this.baseUrl}/users/login`, credentials, { headers: this.getHeaders() })
      .subscribe((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/packages']);
      });
  }

  isAuthenticated(): boolean {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
    return !!token;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
