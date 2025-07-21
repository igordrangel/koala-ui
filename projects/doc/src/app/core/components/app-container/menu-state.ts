import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuState {
  private readonly _isOpen = signal<boolean>(false);

  get isOpen() {
    return this._isOpen.asReadonly();
  }

  toggle() {
    this._isOpen.update((current) => {
      return !current;
    });
  }
}
