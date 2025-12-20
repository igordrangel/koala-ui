import {
  afterRenderEffect,
  Component,
  input,
  ResourceRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Loader } from '@koalarx/ui/core/components/loader';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { delay } from '@koalarx/utils/KlDelay';

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
  imports: [ReactiveFormsModule, FieldErrors, Loader],
})
export class Select extends InputFieldBase {
  options = input.required<ResourceRef<SelectList>>();

  constructor() {
    super();

    afterRenderEffect(async () => {
      const selectElement = document.getElementById(
        this.fieldId
      ) as HTMLSelectElement;
      const currentWidth = selectElement.offsetWidth;
      selectElement.style.setProperty('--select-width', `${currentWidth}px`);

      while (this.options().isLoading()) {
        this.isDisabled.set(true);
        await delay(50);
      }

      this.isDisabled.set(false);
      selectElement.value = this.control().value;
    });
  }

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

  clear(event: MouseEvent) {
    event.preventDefault();
    this.control().setValue(null);

    const selectElement = document.getElementById(
      this.fieldId
    ) as HTMLSelectElement;
    selectElement.selectedIndex = -1;
  }
}
