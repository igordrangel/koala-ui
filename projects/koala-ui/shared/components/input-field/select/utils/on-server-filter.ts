import { effect } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Select } from '../select';
import { SelectExperimental } from '../select-experimental';

export function onServerFilter(component: Select | SelectExperimental) {
  toObservable(component.filter, { injector: component.injector })
    .pipe(debounceTime(300), takeUntilDestroyed(component.destroyRef))
    .subscribe((value) => component.filteredValue.set(value ?? null));

  effect(
    () => {
      if (component.optionsResource()?.onDemand) {
        component.requestOptionsParams.set({
          filter: component.filteredValue(),
          internalFilter: component.internalFilter(),
          currentValue: component.control().value,
        });
      }
    },
    { injector: component.injector }
  );
}
