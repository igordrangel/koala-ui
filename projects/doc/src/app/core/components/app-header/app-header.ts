import { Component } from '@angular/core';
import {
  HorizontalMenuContainer,
  HorizontalMenuItem,
} from '@koalarx/ui/shared/components/horizontal-menu';
import { Logotype } from '../logotype/logotype';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  imports: [Logotype, HorizontalMenuContainer, HorizontalMenuItem],
})
export class AppHeader {}
