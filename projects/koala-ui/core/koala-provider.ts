import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Provider } from '@angular/core';
import { HttpClientErrorsMiddleware } from '@koalarx/ui/core/middlewares';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { AppConfig } from './config';
import { FeedbackRequestInterceptor } from './interceptors/feedback-request-interceptor';
import { getTranslationByLanguage, KoalaLanguage } from './translations';

const maskOptions: Partial<NgxMaskConfig> = {
  validation: false,
  thousandSeparator: '.',
};

interface KoalaSettings {
  hostApi?: string;
  language?: KoalaLanguage;
  httpClientErrorsMiddleware?: HttpClientErrorsMiddleware;
}

export function provideKoala(config?: KoalaSettings): Provider {
  const appConfig = new AppConfig();

  appConfig.language = config?.language ?? 'en';
  appConfig.translation = getTranslationByLanguage(config?.language ?? 'en');
  appConfig.hostApi = config?.hostApi;
  appConfig.httpClientErrorsMiddleware = config?.httpClientErrorsMiddleware;

  return [
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
}
