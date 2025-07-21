import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import {
  HorizontalMenuContainer,
  HorizontalMenuItem,
} from '@koalarx/ui/shared/components/horizontal-menu';
import { MenuState } from '../app-container/menu-state';
import { GithubStars } from '../github-starts/github-stars';
import { Logotype } from '../logotype/logotype';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  imports: [
    Logotype,
    HorizontalMenuContainer,
    HorizontalMenuItem,
    GithubStars,
    ThemeSwitcher,
  ],
})
export class AppHeader {
  private readonly router = inject(Router);
  private firstLoad = true;

  menuState = inject(MenuState);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.firstLoad) {
          this.firstLoad = false;
          return;
        }

        this.menuState.toggle();
      }
    });
  }
}
