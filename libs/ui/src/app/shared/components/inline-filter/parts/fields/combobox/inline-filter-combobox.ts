import { Combobox, ComboboxField, ComboboxOptions } from '@/shared/components/combobox';
import { Component, computed, effect, OnInit, viewChild } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { FieldBase } from '../field.base';

@Component({
  selector: 'app-inline-filter-combobox',
  templateUrl: './inline-filter-combobox.html',
  imports: [FormField, Combobox],
})
export class InlineFilterCombobox extends FieldBase implements OnInit {
  private readonly comboboxComponentRef = viewChild<ComboboxField>('comboboxField');

  readonly options = computed(() => this.config().options as ComboboxOptions<any, any>);

  constructor() {
    super();

    effect(() => {
      const config = this.config();
      const selectedOptions = this.comboboxComponentRef()?.selectedOptions();

      if (!this.valueForm.value().valid()) {
        return;
      }

      if (selectedOptions) {
        config.templateValue.set(selectedOptions.map((option) => option.label).join(', '));
      } else {
        config.templateValue.set('');
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.comboboxComponentRef()?.inputFilterElement()?.nativeElement.focus();
      this.comboboxComponentRef()?.toggleDropdown();
    });
  }
}
