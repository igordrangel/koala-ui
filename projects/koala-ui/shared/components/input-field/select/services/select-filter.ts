import { Injectable, ModelSignal } from '@angular/core';
import { Select } from '../select';

@Injectable()
export class SelectFilter {
  private component: Select | null = null;
  private filter: ModelSignal<string | undefined> | null = null;

  init(component: Select, filter: ModelSignal<string | undefined>) {
    this.component = component;
    this.filter = filter;
  }
}
