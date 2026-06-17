import { Injector, resource } from '@angular/core';
import { ListConfig } from '../config';

export function handleResourceOptions(injector: Injector, listConfig?: ListConfig) {
  if (listConfig?.resourceRef) {
    return listConfig.resourceRef;
  } else {
    return resource({
      injector,
      defaultValue: [],
      loader: () => {
        return Promise.resolve(listConfig?.onMemory || []);
      },
    });
  }
}
