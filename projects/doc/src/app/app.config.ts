import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideKoala } from '@koalarx/ui';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideKoala({
      authConfig: {
        storageTokenKey: '@koalarx_ui:access_token',
        storageRefreshTokenKey: '@koalarx_ui:refresh_token',
        refreshToken: {
          url: 'https://dummyjson.com/auth/refresh',
          data: {
            tokenKeyName: 'accessToken',
            refreshTokenKeyName: 'refreshToken',
          },
          response: {
            accessTokenKeyName: 'accessToken',
            refreshTokenKeyName: 'refreshToken',
          },
        },
        userInfo: {
          url: 'https://dummyjson.com/auth/me',
        },
      },
    }),
  ],
};
