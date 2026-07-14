import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';
import { NoopTitleStrategy } from './core/i18n/locale-title.service';
import { FeedbackRequestInterceptor } from './core/interceptors/feedback-request-interceptor';

function docsBaseHrefFactory(doc: Document): string {
  return doc.querySelector('base')?.getAttribute('href') || '/';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    { provide: TitleStrategy, useClass: NoopTitleStrategy },
    { provide: APP_BASE_HREF, useFactory: docsBaseHrefFactory, deps: [DOCUMENT] },
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: FeedbackRequestInterceptor, multi: true },
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
  ],
};
