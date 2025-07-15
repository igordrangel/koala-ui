import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import {
  CurrentTranslation,
  KoalaLanguage,
} from './translations/current-language';

const maskOptions: Partial<NgxMaskConfig> = {
  validation: false,
  thousandSeparator: '.',
};

export function provideKoala(lang: KoalaLanguage = 'en'): Provider {
  CurrentTranslation.defineLanguage(lang);

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
