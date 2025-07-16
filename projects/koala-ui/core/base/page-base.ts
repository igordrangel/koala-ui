import { signal } from '@angular/core';

export abstract class PageBase {
  protected reload = signal(false);

  protected reloadList() {
    this.reload.set(true);
    setTimeout(() => this.reload.set(false));
  }
}
