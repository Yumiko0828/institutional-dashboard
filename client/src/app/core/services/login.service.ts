import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/api';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private session: SessionService) {}

  sendReq(body: Record<'email' | 'password', string>) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`,
      body
    );
  }

  saveSession(res: AuthResponse) {
    this.session.signIn(res);
  }
}
