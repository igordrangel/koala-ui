import {
  isSignal,
  ResourceRef,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { Select } from '../select';
import {
  OptionsResource,
  SelectDataOptionsFn,
  SelectList,
} from '../select.type';

export function generateOptionsResource(component: Select) {
  const options = component.options();

  let optionsResource: OptionsResource;

  if (Object.hasOwn(options, 'value')) {
    optionsResource = { onServer: options as ResourceRef<SelectList> };
  } else if (isSignal(options)) {
    optionsResource = {
      inMemoryWithLoading: options as Signal<SelectList>,
    };
  } else if (typeof options === 'function') {
    const resourceFnOptions = options as SelectDataOptionsFn;

    optionsResource = {
      onDemand: runInInjectionContext(component.injector, () =>
        resourceFnOptions(component.requestOptionsParams)
      ),
    };
  } else {
    optionsResource = { inMemory: options as SelectList };
  }

  component.optionsResource.set(optionsResource);
}
