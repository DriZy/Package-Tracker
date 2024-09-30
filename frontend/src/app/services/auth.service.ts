import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  signup(credentials: { username: string; password: string }) {
    return this.http.post('/api/users/signup', credentials)
      .subscribe((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/']);
      });
  }

  login(credentials: { password: string; username: string }) {
    return this.http.post('/api/users/login', credentials)
      .subscribe((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/']);
      });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
