import { signal } from '@angular/core';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../constants/security-storage-keys';

export class Authentication {
  private static readonly _accessToken = signal<string | undefined>(
    localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? undefined,
  );
  private static readonly _refreshToken = signal<string | undefined>(
    localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) ?? undefined,
  );

  static clearTokens() {
    this._accessToken.set(undefined);
    this._refreshToken.set(undefined);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }

  static get refreshToken() {
    return this._refreshToken.asReadonly();
  }

  static get accessToken() {
    return this._accessToken.asReadonly();
  }

  static auth(accessToken: string, refreshToken: string) {
    this._accessToken.set(accessToken);
    this._refreshToken.set(refreshToken);

    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }
}
