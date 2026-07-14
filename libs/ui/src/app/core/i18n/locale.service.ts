import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { DEFAULT_LOCALE, isLocale, type Locale, SUPPORTED_LOCALES } from './locale.types';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly router = inject(Router);

  readonly supportedLocales = SUPPORTED_LOCALES;
  readonly defaultLocale = DEFAULT_LOCALE;

  readonly locale = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.parseLocale(this.router.url)),
      startWith(this.parseLocale(this.router.url)),
    ),
    { initialValue: this.parseLocale(this.router.url) },
  );

  parseLocale(url: string): Locale {
    const segment = url.split(/[?#]/)[0].split('/').filter(Boolean)[0];
    return isLocale(segment) ? segment : DEFAULT_LOCALE;
  }

  homeRoute(locale = this.locale()) {
    return `/${locale}`;
  }

  path(routePath = '', locale = this.locale()) {
    const clean = routePath.replace(/^\/+/, '').replace(/\/+$/, '');
    return clean ? `/${locale}/${clean}` : `/${locale}`;
  }

  switchLocalePath(target: Locale): string {
    const [pathWithQuery = '', hash = ''] = this.router.url.split('#');
    const [pathname = '', query = ''] = pathWithQuery.split('?');
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length && isLocale(parts[0])) {
      parts[0] = target;
    } else {
      parts.unshift(target);
    }

    const path = `/${parts.join('/')}`;
    const search = query ? `?${query}` : '';
    const fragment = hash ? `#${hash}` : '';
    return `${path}${search}${fragment}`;
  }
}
