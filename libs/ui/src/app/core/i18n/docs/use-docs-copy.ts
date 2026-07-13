import { computed, inject, type Signal } from '@angular/core';
import { LocaleService } from '../locale.service';
import type { Locale } from '../locale.types';
import { docsCommon, type DocsCommon } from './common';
import { DOCS_PAGES, type DocsPageSlug } from './pages';

type PageCopy<S extends DocsPageSlug> = (typeof DOCS_PAGES)[S][Locale];

export function useDocsCopy<S extends DocsPageSlug>(
  slug: S,
): {
  localeService: LocaleService;
  common: Signal<DocsCommon>;
  copy: Signal<PageCopy<S>>;
} {
  const localeService = inject(LocaleService);

  return {
    localeService,
    common: computed(() => docsCommon(localeService.locale())),
    copy: computed(() => DOCS_PAGES[slug][localeService.locale()]) as Signal<PageCopy<S>>,
  };
}
