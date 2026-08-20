import { ViewportScroller } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet, Scroll } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { Footer } from './core/components/footer';
import { Header } from './core/components/header';
import { NavMenu } from './core/components/nav-menu';
import { LocaleService } from './core/i18n/locale.service';
import { LocaleTitleService } from './core/i18n/locale-title.service';
import { isLocale } from './core/i18n/locale.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, Footer, Header, NavMenu, LoadingBarRouterModule],
})
export class App {
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  private localeService = inject(LocaleService);
  private readonly _localeTitle = inject(LocaleTitleService);

  readonly isFullWidthPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.computeFullWidth()),
    ),
    { initialValue: this.computeFullWidth() },
  );

  /** Icons page: no sidebar — pad content to match header logo column. */
  readonly isIconsPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.computeIconsPage()),
    ),
    { initialValue: this.computeIconsPage() },
  );

  private pathWithoutLocale(): string[] {
    const parts = this.router.url.split(/[?#]/)[0].split('/').filter(Boolean);
    return parts[0] && isLocale(parts[0]) ? parts.slice(1) : parts;
  }

  private computeFullWidth(): boolean {
    const withoutLocale = this.pathWithoutLocale();
    return withoutLocale.length === 0 || withoutLocale[0] === 'icons';
  }

  private computeIconsPage(): boolean {
    return this.pathWithoutLocale()[0] === 'icons';
  }

  readonly isHomePage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const parts = this.router.url.split(/[?#]/)[0].split('/').filter(Boolean);
        return parts.length === 1 && isLocale(parts[0]);
      }),
    ),
    {
      initialValue: (() => {
        const parts = this.router.url.split(/[?#]/)[0].split('/').filter(Boolean);
        return parts.length === 1 && isLocale(parts[0]);
      })(),
    },
  );

  constructor() {
    effect(() => {
      document.documentElement.lang = this.localeService.locale() === 'pt' ? 'pt-BR' : 'en';
    });

    // Configura o recuo global para qualquer âncora/id clicado no app
    // [0, 250] significa: 0 pixels de recuo na esquerda, 250 pixels de recuo no topo (ajuste conforme seu header)
    this.viewportScroller.setOffset([0, 250]);

    // Opcional: Garante que o Angular aplique o offset durante transições de rota
    this.router.events.pipe(filter((e): e is Scroll => e instanceof Scroll)).subscribe((e) => {
      if (e.anchor) {
        // Aguarda um microtick para garantir que o DOM renderizou os ids dinâmicos
        setTimeout(() => this.viewportScroller.scrollToAnchor(e.anchor!), 0);
      }
    });
  }
}
