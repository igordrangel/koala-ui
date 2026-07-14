import { Combobox, ComboboxOption } from '@/shared/components/combobox';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-combobox-local-sample',
  template: `
    <app-combobox
      class="w-full"
      placeholder="Select a state"
      [options]="localOptions"
      [formField]="comboboxForm.local"
    />
  `,
  imports: [FormField, Combobox],
})
export class ComboboxLocalSample {
  private readonly comboboxModel = signal<{ local: string | null }>({ local: '' });
  readonly comboboxForm = form(this.comboboxModel);

  readonly localOptions = new KlArray<ComboboxOption<string>>([
    { value: 'sp', label: 'Sao Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'ba', label: 'Bahia' },
    { value: 'pr', label: 'Parana' },
    { value: 'sc', label: 'Santa Catarina' },
    { value: 'rs', label: 'Rio Grande do Sul' },
    { value: 'pe', label: 'Pernambuco' },
  ]).orderBy('label', 'asc');
}
