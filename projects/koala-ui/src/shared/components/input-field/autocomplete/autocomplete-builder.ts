import { Injectable, ResourceRef } from '@angular/core';
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
}
