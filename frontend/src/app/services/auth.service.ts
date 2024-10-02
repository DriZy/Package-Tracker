import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  constructor(private http: HttpClient, private router: Router) {}

  signup(credentials: { username: string; password: string; role: string }) {
    return this.http.post(`${environment.apiBaseUrl}/users/signup`, credentials, {headers: this.getHeaders()})
      .subscribe((response: any) => {
        this.storeUserCredentials(response.token,  response.user.role);
        this.redirectUserByRole( response.user.role);
      });
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${environment.apiBaseUrl}/users/login`, credentials, {headers: this.getHeaders()})
      .subscribe((response: any) => {
        this.storeUserCredentials(response.token, response.user.role);
        this.redirectUserByRole(response.user.role);
      });
  }

  private storeUserCredentials(token: string, role: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
  }

  // Redirect based on user role
  private redirectUserByRole(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'driver') {
      this.router.navigate(['/driver']);
    } else {
      this.router.navigate(['/tracker']);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.router.navigate(['/login']);
  }
}
