import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';

const maskOptions: Partial<NgxMaskConfig> = {
  validation: false,
  thousandSeparator: '.',
};

export function provideKoala(): Provider {
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
