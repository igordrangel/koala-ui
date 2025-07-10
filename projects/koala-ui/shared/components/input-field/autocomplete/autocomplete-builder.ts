import { Injectable, ResourceRef, Signal } from '@angular/core';
import {
  AutocompleteDataOptionsFn,
  AutocompleteList,
} from './autocomplete-value';

@Injectable({ providedIn: 'root' })
export class AutocompleteBuilder {
  onDemand(config: AutocompleteDataOptionsFn) {
    return config;
  }

  onServer(config: ResourceRef<AutocompleteList>) {
    return config;
  }

  inMemory(config: AutocompleteList) {
    return config;
  }

  inMemoryWithLoading(config: Signal<AutocompleteList>) {
    return config;
  }
}
