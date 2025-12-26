import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KlRoot } from '@koalarx/ui/core/components/kl-root';
import { AppContainer } from './core/components/app-container/app-container';
import { AppFooter } from './core/components/app-footer/app-footer';
import { AppHeader } from './core/components/app-header/app-header';
import { NavMenu } from './core/components/nav-menu/nav-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KlRoot, RouterOutlet, AppHeader, AppContainer, NavMenu, AppFooter],
})
export class App {}
