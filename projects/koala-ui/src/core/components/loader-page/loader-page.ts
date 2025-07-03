import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderPage {
  private _loading = signal(false);

  get isLoading() {
    return this._loading.asReadonly();
  }

  show() {
    this._loading.set(true);
  }

  dismiss() {
    this._loading.set(false);
  }
}
