import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuState } from './menu-state';

@Component({
  selector: 'app-container',
  templateUrl: './app-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainer {
  menuState = inject(MenuState).isOpen;
}
