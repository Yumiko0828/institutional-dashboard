import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserResponse[]>(`${environment.apiUrl}/users`);
  }

  whoami() {
    return this.http.get<UserResponse>(`${environment.apiUrl}/users/whoami`);
  }
}
