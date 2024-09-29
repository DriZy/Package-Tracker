import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
