import { Title } from '@angular/platform-browser';
import { effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { generateTitle } from '../utils/generate-title';
import { DOCS_PAGES, type DocsPageSlug } from './docs/pages';
import { LocaleService } from './locale.service';
import { isLocale } from './locale.types';
import { UI_COPY } from './ui-copy';

@Injectable({ providedIn: 'root' })
export class LocaleTitleService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly localeService = inject(LocaleService);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  constructor() {
    effect(() => {
      const locale = this.localeService.locale();
      const parts = this.url().split(/[?#]/)[0].split('/').filter(Boolean);

      if (!parts.length || (parts.length === 1 && isLocale(parts[0]))) {
        this.title.setTitle(generateTitle(UI_COPY[locale].landing.pageTitle));
        return;
      }

      const slug = parts[parts.length - 1];
      if (slug in DOCS_PAGES) {
        this.title.setTitle(generateTitle(DOCS_PAGES[slug as DocsPageSlug][locale].title));
        return;
      }

      this.title.setTitle(generateTitle(UI_COPY[locale].landing.pageTitle));
    });
  }
}

/** Disable default TitleStrategy so LocaleTitleService owns document titles. */
@Injectable()
export class NoopTitleStrategy extends TitleStrategy {
  override updateTitle(): void {}
}
