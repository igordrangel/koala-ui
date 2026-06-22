import { Combobox, ComboboxOption } from '@/shared/components/combobox';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-combobox-local-sample',
  template: `
    <app-combobox
      class="w-full"
      placeholder="Select a state"
      [options]="localOptions"
      [formControl]="localComboboxControl"
    />
  `,
  imports: [ReactiveFormsModule, Combobox],
})
export class ComboboxLocalSample {
  readonly localComboboxControl = new FormControl<string | null>('');

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
