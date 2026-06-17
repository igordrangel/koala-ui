import { WritableSignal } from '@angular/core';
import { InlineFilterField } from '../../config';

export function asyncNotFoundTemplateValue(
  selectedOptions: WritableSignal<InlineFilterField[]>,
  option: InlineFilterField,
) {
  selectedOptions.update((current) => {
    const optionIndex = current.findIndex((opt) => opt.name === option.name);

    if (optionIndex === -1) {
      return current;
    }

    const currentOption = current[optionIndex];

    currentOption.templateValue.set('');
    currentOption.loading.set(false);

    return current;
  });
}
