import { Injectable, ResourceRef, Signal } from '@angular/core';
import { SelectDataOptionsFn, SelectList } from '../select.type';

@Injectable({ providedIn: 'root' })
export class SelectBuilder {
  onDemand(config: SelectDataOptionsFn) {
    return config;
  }

  onServer(config: ResourceRef<SelectList>) {
    return config;
  }

  inMemory(config: SelectList) {
    return config;
  }

  inMemoryWithLoading(config: Signal<SelectList>) {
    return config;
  }
}
