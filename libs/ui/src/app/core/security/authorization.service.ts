import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/internal/operators/tap';
import { Credentials } from '../models/credentials';
import { LoggedUser } from '../models/logged-user';
import { Authentication } from '../utils/authentication';

export type AuthEventType =
  | 'loginInProgress'
  | 'loadingUserInfo'
  | 'authenticated'
  | 'authenticationFailed';
export const HOME_ROUTE = '/blocks/login';
export const LOGIN_ROUTE = '/blocks/login';

export interface AuthEvent {
  type: AuthEventType;
  data: any;
}

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly hostApi = 'https://dummyjson.com';
  private readonly _loggedUser = signal<LoggedUser | undefined>(undefined);
  private readonly _event = signal<AuthEvent | undefined>(undefined);

  constructor() {
    effect(() => {
      const accessToken = Authentication.accessToken();

      if (accessToken && !this._loggedUser()) {
        this._event.set({ type: 'loadingUserInfo', data: accessToken });
      } else if (!accessToken) {
        this.router.navigate([LOGIN_ROUTE]);
      }
    });

    effect(() => {
      const event = this._event();

      if (!event) return;

      switch (event.type) {
        case 'loadingUserInfo':
          const accessToken = event.data as string;

          if (accessToken) {
            this.getUserInfo().subscribe();
          }
          break;
        case 'authenticated':
          if (location.hash.includes('login')) {
            this.router.navigate([HOME_ROUTE]);
          }
          break;
      }
    });
  }

  private getUserInfo() {
    return this.http
      .get<any>(`${this.hostApi}/auth/me`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .pipe(
        tap({
          next: (userInfo) => {
            const loggedUser = new LoggedUser({
              id: userInfo.id,
              name: `${userInfo.firstName} ${userInfo.lastName}`,
              avatar: userInfo.image,
              rules: [],
            });
            this._loggedUser.set(loggedUser);
            this._event.set({ type: 'authenticated', data: loggedUser });
          },
          error: () => this.logout(),
        }),
      );
  }

  get loggedUser() {
    return this._loggedUser.asReadonly();
  }

  get event() {
    return this._event.asReadonly();
  }

  get hasToken() {
    return computed(() => !!Authentication.accessToken());
  }

  get accessToken() {
    return Authentication.accessToken();
  }

  get refreshToken() {
    return Authentication.refreshToken();
  }

  get isAuthenticated() {
    return computed(() => !!this._loggedUser());
  }

  isExpired() {
    if (!this.accessToken) {
      return true;
    }

    const decodedToken = jwtDecode(this.accessToken) as { exp: number };
    const exp = decodedToken.exp * 1000; // Convert to milliseconds
    const now = Date.now();

    return now > exp;
  }

  auth(credentials: Credentials) {
    this._event.set({ type: 'loginInProgress', data: null });
    return this.http.post<any>(`${this.hostApi}/auth/login`, credentials).subscribe({
      next: (response) => Authentication.auth(response.accessToken, response.refreshToken),
      error: () => {
        Authentication.clearTokens();
        this._event.set({ type: 'authenticationFailed', data: null });
      },
    });
  }

  updateToken() {
    return this.http
      .post<any>(`${this.hostApi}/auth/refresh`, {
        refreshToken: this.refreshToken,
        expiresInMins: 60,
      })
      .pipe(
        tap({
          next: (response) => Authentication.auth(response.accessToken, response.refreshToken),
          error: () => {
            Authentication.clearTokens();
            this._event.set({ type: 'authenticationFailed', data: null });
          },
        }),
      );
  }

  logout() {
    Authentication.clearTokens();
    this._loggedUser.set(undefined);
    this._event.set(undefined);
    this.router.navigate([LOGIN_ROUTE]);
  }
}
