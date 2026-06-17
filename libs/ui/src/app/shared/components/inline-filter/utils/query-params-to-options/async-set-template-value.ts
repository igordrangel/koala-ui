import { ComboboxOption } from '@/shared/components/combobox';
import { SelectOption } from '@/shared/components/select';
import { WritableSignal } from '@angular/core';
import { InlineFilterField } from '../../config';
import { filterOptionsByValue } from './filter-options-by-value';
import { joinOptionLabels } from './join-option-labels';

export function asyncSetTemplateValue(
  selectedOptions: WritableSignal<InlineFilterField[]>,
  loadedOptions: (SelectOption<any, any> | ComboboxOption<any, any>)[],
  selectedOption: InlineFilterField,
  value: string | string[],
) {
  selectedOptions.update((current) => {
    const optionIndex = current.findIndex((opt) => opt.name === selectedOption.name);

    if (optionIndex === -1) {
      return current;
    }

    const currentOption = current[optionIndex];

    currentOption.templateValue.set(joinOptionLabels(filterOptionsByValue(loadedOptions, value)));
    currentOption.loading.set(false);

    return current;
  });
}
