import { Button } from '@/shared/components/button';
import { Tooltip } from '@/shared/components/tooltip';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { APP_VERSION } from '../../constants/app-version';
import { LocalePathPipe } from '../../i18n/locale-path.pipe';
import { LocaleService } from '../../i18n/locale.service';
import type { Locale } from '../../i18n/locale.types';
import { DocSearch } from '../doc-search';
import { GithubStars } from '../github-starts/github-stars';
import { NavMenu } from '../nav-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [
    CommonModule,
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
  readonly localeService = inject(LocaleService);

  readonly copied = signal(false);
  readonly version = `v${APP_VERSION}`;
  readonly mobileMenuVisible = signal(false);
  readonly mobileMenuOpen = signal(false);

  copyLlmsUrl() {
    const url = `${location.origin}/llms.txt`;
    navigator.clipboard.writeText(url).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  switchLocale(locale: Locale) {
    void this.router.navigateByUrl(this.localeService.switchLocalePath(locale));
  }

  toggleMobileMenu() {
    const isVisible = this.mobileMenuVisible();
    this.mobileMenuVisible.set(!isVisible);
    if (!isVisible) {
      setTimeout(() => this.mobileMenuOpen.set(true), 10);
    }
  }

  openMobileMenu() {
    this.mobileMenuVisible.set(true);
    setTimeout(() => this.mobileMenuOpen.set(true), 10);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    setTimeout(() => this.mobileMenuVisible.set(false), 200);
  }
}
