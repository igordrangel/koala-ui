import { SelectOption } from '@/shared/components/select';
import { Injector, ResourceRef, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs/internal/operators/delay';
import { first } from 'rxjs/internal/operators/first';
import { InlineFilterField } from '../../config';
import { asyncNotFoundTemplateValue } from './async-not-found-template-value';
import { asyncSetTemplateValue } from './async-set-template-value';
import { filterOptionsByValue } from './filter-options-by-value';
import { joinOptionLabels } from './join-option-labels';

export function toSelect(
  option: InlineFilterField,
  value: string,
  selectedOptions: WritableSignal<InlineFilterField[]>,
  injector: Injector,
) {
  if (Array.isArray(option.options)) {
    option.templateValue.set(joinOptionLabels(filterOptionsByValue(option.options, value)));
  } else {
    const optionsResource = option.options as ResourceRef<SelectOption<any, any>[]>;

    option.loading.set(true);

    toObservable(optionsResource.value, { injector })
      .pipe(delay(50), first())
      .subscribe({
        next: (options) => asyncSetTemplateValue(selectedOptions, options, option, value),
        error: () => asyncNotFoundTemplateValue(selectedOptions, option),
      });
  }
}
