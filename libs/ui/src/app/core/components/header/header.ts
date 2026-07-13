import { Button } from '@/shared/components/button';
import { Tooltip } from '@/shared/components/tooltip';
import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { APP_VERSION } from '../../constants/app-version';
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

  readonly locale = this.localeService.locale;
  readonly copy = computed(() => UI_COPY[this.localeService.locale()]);
  readonly homeLink = computed(() => this.localeService.homeRoute());

  readonly copied = signal(false);
  readonly version = `v${APP_VERSION}`;
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

  copyLlmsUrl() {
    const url = `${location.origin}/llms.txt`;
    navigator.clipboard.writeText(url).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  switchLocale(target: Locale) {
    if (target === this.localeService.locale()) return;
    void this.router.navigateByUrl(this.localeService.switchLocalePath(target));
  }

  toggleMobileMenu() {
    const isVisible = this.mobileMenuVisible();
    if (!isVisible) {
      this.mobileMenuVisible.set(true);
      this.mobileMenuOpen.set(true);
      return;
    }
    this.closeMobileMenu();
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    setTimeout(() => this.mobileMenuVisible.set(false), 200);
  }
}
