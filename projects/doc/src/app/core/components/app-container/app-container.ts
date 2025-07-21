import { Component, inject } from '@angular/core';
import { MenuState } from './menu-state';

@Component({
  selector: 'app-container',
  templateUrl: './app-container.html',
})
export class AppContainer {
  menuState = inject(MenuState).isOpen;
}
