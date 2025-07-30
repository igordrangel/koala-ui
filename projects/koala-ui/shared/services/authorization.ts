import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '@koalarx/ui/core/config';
import { AuthConfig } from '@koalarx/ui/core/models';
import { Confirm } from '@koalarx/ui/shared/components/confirm';
import { jwtDecode } from 'jwt-decode';
import { first } from 'rxjs/internal/operators/first';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({ providedIn: 'root' })
export class Authorization<TUser = any> {
  private readonly appConfig = inject(AppConfig);
  private readonly translation =
    this.appConfig.translation.jwtAuthorizationService;
  private readonly authConfig = this.appConfig.authConfig as AuthConfig;
  private _accessToken = signal<string | null>(
    localStorage.getItem(this.authConfig.storageTokenKey)
  );
  private _refreshToken = signal<string | null>(
    localStorage.getItem(this.authConfig.storageRefreshTokenKey)
  );
  private _isAuthenticated = signal<boolean>(false);
  private _userinfo = signal<TUser | null>(null);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly confirm = inject(Confirm);

  get accessToken() {
    const accessToken = this._accessToken();
    return accessToken;
  }

  set accessToken(accessToken: string | null) {
    if (accessToken) {
      localStorage.setItem(this.authConfig.storageTokenKey, accessToken);
    } else {
      localStorage.removeItem(this.authConfig.storageTokenKey);
    }

    this._accessToken.set(accessToken);
  }

  get refreshToken() {
    const refreshToken = this._refreshToken();
    return refreshToken;
  }

  set refreshToken(refreshToken: string | null) {
    if (refreshToken) {
      localStorage.setItem(
        this.authConfig.storageRefreshTokenKey,
        refreshToken
      );
    } else {
      localStorage.removeItem(this.authConfig.storageRefreshTokenKey);
    }

    this._refreshToken.set(refreshToken);
  }

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  get userinfo() {
    return this._userinfo.asReadonly();
  }

  get isExpired() {
    return computed(() => {
      const accessToken = this._accessToken();

      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);

        if (decodedToken) {
          const exp = new Date((decodedToken.exp ?? 0) * 1000);
          const now = new Date();

          return exp < now;
        }
      }

      return true;
    });
  }

  get hasToken() {
    return computed(() => !!this._accessToken());
  }

  constructor() {
    if (this.appConfig.authConfig) {
      this.init();
    }
  }

  private init() {
    effect(() => {
      const userInfo = this._userinfo();

      if (userInfo) {
        this.updateAuthState();
      }
    });

    effect(() => {
      const isAuthenticated = this.isAuthenticated();

      if (
        isAuthenticated &&
        (!this.authConfig.loginRoute ||
          (this.authConfig.loginRoute &&
            location.hash.includes(this.authConfig.loginRoute))) &&
        this.authConfig.homeRoute
      ) {
        this.router.navigate([this.authConfig.homeRoute]);
      }
    });

    effect(() => {
      const hasToken = this.hasToken();

      if (hasToken) {
        this.loadUserInfo();
      } else if (
        this.authConfig.loginRoute &&
        !location.hash.includes(this.authConfig.loginRoute)
      ) {
        this.router.navigate([this.authConfig.loginRoute]);
      }
    });
  }

  private updateAuthState() {
    this._isAuthenticated.set(
      this.hasToken() && !this.isExpired() && !!this._userinfo()
    );
  }

  private logoutUser() {
    localStorage.removeItem(this.authConfig.storageTokenKey);
    localStorage.removeItem(this.authConfig.storageRefreshTokenKey);
    this._userinfo.set(null);
    this._refreshToken.set(null);
    this._accessToken.set(null);
    this.updateAuthState();
  }

  private loadUserInfo() {
    this.http.get<TUser>(this.authConfig.userInfo.url).subscribe({
      next: (userInfo) => this._userinfo.set(userInfo),
      error: () => this.logoutUser(),
    });
  }

  logout(force = false) {
    if (force) {
      this.logoutUser();
      return;
    }

    this.confirm.open({
      message: this.translation.questionLogoutMessage,
      yesCallback: () => this.logoutUser(),
    });
  }

  updateToken() {
    return this.http.post<any>(this.authConfig.refreshToken.url, {}).pipe(
      tap({
        next: (response) => {
          this.accessToken =
            response[this.authConfig.refreshToken.response.accessTokenKeyName];
          this.refreshToken =
            response[this.authConfig.refreshToken.response.refreshTokenKeyName];
          this.updateAuthState();
        },
        error: () => {
          this.logout(true);
          this.router.navigate([this.authConfig.loginRoute]);
        },
      }),
      first()
    );
  }
}
