import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { AppConfig } from './config';
import { getTranslationByLanguage, KoalaLanguage } from './translations';

const maskOptions: Partial<NgxMaskConfig> = {
  validation: false,
  thousandSeparator: '.',
};

interface KoalaSettings {
  hostApi?: string;
  language?: KoalaLanguage;
}

export function provideKoala(config?: KoalaSettings): Provider {
  AppConfig.language = config?.language ?? 'en';
  AppConfig.translation = getTranslationByLanguage(config?.language ?? 'en');
  AppConfig.hostApi = config?.hostApi;

  return [
    provideEnvironmentNgxMask(maskOptions),
    provideHttpClient(),
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
  ];
}
