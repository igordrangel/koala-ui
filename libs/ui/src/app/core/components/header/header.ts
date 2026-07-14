import { Button } from '@/shared/components/button';
import { Tooltip } from '@/shared/components/tooltip';
import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import type { DocsVersionEntry } from '../../constants/docs-versions';
import { DocsVersionService } from '../../docs-version/docs-version.service';
import { LocalePathPipe } from '../../i18n/locale-path.pipe';
import { LocaleService } from '../../i18n/locale.service';
import type { Locale } from '../../i18n/locale.types';
import { UI_COPY } from '../../i18n/ui-copy';
import { DocSearch } from '../doc-search';
import { GithubStars } from '../github-starts/github-stars';
import { NavMenu } from '../nav-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [
    NgTemplateOutlet,
    DocSearch,
    GithubStars,
    Button,
    RouterLink,
    RouterLinkActive,
    Tooltip,
    NavMenu,
    LocalePathPipe,
  ],
})
export class Header {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly localeService = inject(LocaleService);
  private readonly docsVersion = inject(DocsVersionService);

  readonly locale = this.localeService.locale;
  readonly copy = computed(() => UI_COPY[this.localeService.locale()]);
  readonly homeLink = computed(() => this.localeService.homeRoute());

  readonly copied = signal(false);
  readonly docsVersions = this.docsVersion.versions;
  readonly mobileMenuVisible = signal(false);
  readonly mobileMenuOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.mobileMenuVisible()) {
          this.closeMobileMenu();
        }
      });
  }

  isDocsVersionCurrent(entry: DocsVersionEntry) {
    return this.docsVersion.isCurrent(entry);
  }

  copyLlmsUrl() {
    const url = this.docsVersion.assetUrl('llms.txt');
    navigator.clipboard.writeText(url).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  switchLocale(target: Locale) {
    if (target === this.localeService.locale()) return;
    void this.router.navigateByUrl(this.localeService.switchLocalePath(target));
  }

  switchDocsVersion(target: DocsVersionEntry) {
    if (this.docsVersion.isCurrent(target)) return;
    window.location.assign(this.docsVersion.switchVersionHref(target));
  }

  toggleMobileMenu() {
    const isVisible = this.mobileMenuVisible();
    if (!isVisible) {
      this.mobileMenuVisible.set(true);
      setTimeout(() => this.mobileMenuOpen.set(true), 10);
      return;
    }
    this.closeMobileMenu();
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    setTimeout(() => this.mobileMenuVisible.set(false), 200);
  }
}
