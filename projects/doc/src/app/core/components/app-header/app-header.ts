import { Component } from '@angular/core';
import { HorizontalMenuContainer } from '@koalarx/ui/shared/components/horizontal-menu/horizontal-menu-container';
import { HorizontalMenuItem } from '@koalarx/ui/shared/components/horizontal-menu/horizontal-menu-item';
import { Logotype } from '../logotype/logotype';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  imports: [Logotype, HorizontalMenuContainer, HorizontalMenuItem],
})
export class AppHeader {}
