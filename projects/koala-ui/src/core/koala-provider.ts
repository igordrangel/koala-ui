import { Provider } from '@angular/core';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';

const maskOptions: Partial<NgxMaskConfig> = {
  validation: false,
  thousandSeparator: '.',
};

export function provideKoala(): Provider {
  return [provideEnvironmentNgxMask(maskOptions)];
}
