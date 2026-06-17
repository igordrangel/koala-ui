import { Injector, resource, Signal } from '@angular/core';
import { ListConfig } from '../config';

export function handleResourceOptions(
  injector: Injector,
  filter: Signal<string>,
  selectedValues: Signal<any[]>,
  listConfig?: ListConfig,
) {
  if (listConfig?.resourceRef) {
    return resource({
      injector,
      defaultValue: [],
      params: () => ({
        filter: filter(),
        options: listConfig.resourceRef.value(),
      }),
      loader: ({ params }) => {
        return Promise.resolve(
          params.options.filter((option) => {
            const filterValue = params.filter.toLowerCase();
            return option.label.toLowerCase().includes(filterValue);
          }) ?? [],
        );
      },
    });
  } else if (listConfig?.async) {
    return listConfig.async(filter, selectedValues, injector);
  } else {
    return resource({
      injector,
      defaultValue: [],
      params: () => filter(),
      loader: ({ params }) => {
        return Promise.resolve(
          listConfig?.onMemory.filter((option) => {
            const filterValue = params.toLowerCase();
            return option.label.toLowerCase().includes(filterValue);
          }) ?? [],
        );
      },
    });
  }
}
