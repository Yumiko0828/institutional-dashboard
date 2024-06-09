import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isRefreshing$ = false;

  get isRefreshing() {
    return this.isRefreshing$;
  }

  set isRefreshing(value: boolean) {
    this.isRefreshing$ = value;
  }

  refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  onTokenRefreshed() {
    return this.refreshTokenSubject.asObservable();
  }

  notifyTokenRefreshed(token: string) {
    this.refreshTokenSubject.next(token);
  }

  saveTokens(res: AuthResponse) {
    localStorage.setItem('access_token', res.accessToken);
    localStorage.setItem('access_exp', (res.accessExp * 1000).toString());
    localStorage.setItem('refresh_token', res.refreshToken);
    localStorage.setItem('refresh_exp', (res.refreshExp * 1000).toString());
  }

  getTokens() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    return {
      accessToken,
      refreshToken,
    };
  }

  getTokensExp() {
    const accessExp = Number(localStorage.getItem('access_exp'));
    const refreshExp = Number(localStorage.getItem('refresh_exp'));

    return {
      accessExp,
      refreshExp,
    };
  }

  addTokenHeader(req: HttpRequest<unknown>) {
    const { accessToken } = this.getTokens();
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  signIn(data: AuthResponse) {
    this.saveTokens(data);
    this.router.navigateByUrl('/');
  }

  signOut(redirect: boolean = true) {
    localStorage.clear();

    if (redirect) this.router.navigateByUrl('/login');
  }

  isAuth(): boolean {
    const { accessExp, refreshExp } = this.getTokensExp();

    if (isNaN(accessExp) || isNaN(refreshExp)) return false;

    return Date.now() < accessExp || Date.now() < refreshExp;
  }

  refreshTokens() {
    const { refreshToken } = this.getTokens();
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {
      token: refreshToken,
    });
  }
}
