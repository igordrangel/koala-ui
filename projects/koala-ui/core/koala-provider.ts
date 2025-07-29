import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpInterceptor,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Provider } from '@angular/core';
import { AppConfig } from '@koalarx/ui/core/config';
import { HttpClientErrorsMiddleware } from '@koalarx/ui/core/middlewares';
import { AuthConfig } from '@koalarx/ui/core/models/auth-config';
import {
  getTranslationByLanguage,
  KoalaLanguage,
} from '@koalarx/ui/core/translations';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { AuthorizationInterceptor } from './interceptors/authorization-interceptor';
import { FeedbackRequestInterceptor } from './interceptors/feedback-request-interceptor';

const maskOptions: Partial<NgxMaskConfig> = {
  validation: false,
  thousandSeparator: '.',
};

interface KoalaSettings {
  hostApi?: string;
  language?: KoalaLanguage;
  httpClientErrorsMiddleware?: HttpClientErrorsMiddleware;
  authConfig: AuthConfig;
  authorizationInterceptor?: HttpInterceptor;
}

export function provideKoala(config?: KoalaSettings): Provider {
  const appConfig = new AppConfig();

  appConfig.language = config?.language ?? 'en';
  appConfig.translation = getTranslationByLanguage(config?.language ?? 'en');
  appConfig.hostApi = config?.hostApi;
  appConfig.httpClientErrorsMiddleware = config?.httpClientErrorsMiddleware;
  appConfig.authConfig = config?.authConfig;

  const providers: Provider = [
    provideEnvironmentNgxMask(maskOptions),
    provideHttpClient(withInterceptorsFromDi()),
    provideMarkdown({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
        },
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FeedbackRequestInterceptor,
      multi: true,
    },
    {
      provide: AppConfig,
      useValue: appConfig,
    },
  ];

  if (config?.authConfig) {
    providers.push({
      provide: HTTP_INTERCEPTORS,
      useClass: config?.authorizationInterceptor ?? AuthorizationInterceptor,
      multi: true,
    });
  }

  return providers;
}
