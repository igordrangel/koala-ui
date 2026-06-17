import { inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { makeBreadcrumb } from '../utils/make-breadcrumb';

export abstract class PageBase {
  protected reload = signal<boolean>(false);
  protected reloadList() {
    this.reload.set(true);
    setTimeout(() => this.reload.set(false));
  }
  protected readonly breadcrumbs = makeBreadcrumb(inject(ActivatedRoute));
}
