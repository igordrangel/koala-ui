import { Component, input, ResourceRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';

type SelectValue = string | number | boolean | null;
export interface SelectOption<TData = any> {
  label: string;
  value: SelectValue;
  data?: TData;
}
export type SelectList<TData = any> = SelectOption<TData>[];

@Component({
  selector: 'kl-select',
  templateUrl: './select.html',
  imports: [ReactiveFormsModule, FieldErrors],
})
export class Select extends InputFieldBase {
  options = input.required<ResourceRef<SelectList>>();

  onSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    let value: SelectValue = select.value;

    const selectedOption = this.options()
      .value()
      .find((item) => String(item.value) === value);

    if (selectedOption) {
      if (typeof selectedOption.value === 'number') {
        value = Number(value);
      } else if (typeof selectedOption.value === 'boolean') {
        value = value === 'true';
      } else {
        value = selectedOption.value;
      }
      this.control().setValue(value, { emitEvent: true });
    }
  }
}
