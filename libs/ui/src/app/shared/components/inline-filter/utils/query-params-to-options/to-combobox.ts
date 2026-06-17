import {
  AsyncComboboxOptions,
  ComboboxOption,
  ComboboxOptions,
} from '@/shared/components/combobox';
import { Injector, ResourceRef, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs/internal/operators/delay';
import { filter } from 'rxjs/internal/operators/filter';
import { first } from 'rxjs/internal/operators/first';
import { InlineFilterField } from '../../config';
import { asyncNotFoundTemplateValue } from './async-not-found-template-value';
import { asyncSetTemplateValue } from './async-set-template-value';
import { filterOptionsByValue } from './filter-options-by-value';
import { joinOptionLabels } from './join-option-labels';
import { coerceValue } from './coerce-value';

export function toCombobox(
  option: InlineFilterField,
  value: string,
  selectedOptions: WritableSignal<InlineFilterField[]>,
  injector: Injector,
) {
  const options = option.options as ComboboxOptions<any, any>;

  if (Array.isArray(options)) {
    option.templateValue.set(joinOptionLabels(filterOptionsByValue(options, value)));
  } else {
    const optionsResource: ResourceRef<ComboboxOption<any, any>[]> =
      typeof options === 'object'
        ? options
        : (option.options as AsyncComboboxOptions<any, any>)(
            signal(''),
            signal([coerceValue(value)]),
            injector,
          );

    option.loading.set(true);

    toObservable(optionsResource.value, { injector })
      .pipe(
        filter((response) => response.length > 0),
        delay(50),
        first(),
      )
      .subscribe({
        next: (options) => asyncSetTemplateValue(selectedOptions, options, option, value),
        error: () => asyncNotFoundTemplateValue(selectedOptions, option),
      });
  }
}
