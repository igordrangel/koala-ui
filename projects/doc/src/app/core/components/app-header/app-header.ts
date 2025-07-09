import { Component } from '@angular/core';
import {
  HorizontalMenuContainer,
  HorizontalMenuItem,
} from '@koalarx/ui/shared/components/horizontal-menu';
import { Logotype } from '../logotype/logotype';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { GithubStars } from '../github-starts/github-stars';

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
export class AppHeader {}
