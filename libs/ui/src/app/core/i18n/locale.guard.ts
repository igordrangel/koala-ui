import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DEFAULT_LOCALE, isLocale } from './locale.types';

export const localeGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const locale = route.paramMap.get('locale');

  if (isLocale(locale)) {
    return true;
  }

  return router.createUrlTree([`/${DEFAULT_LOCALE}`]);
};
