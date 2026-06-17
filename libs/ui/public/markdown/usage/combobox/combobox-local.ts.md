```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Combobox, ComboboxOption } from '@/shared/components/combobox';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-combobox-local-sample',
  templateUrl: './combobox-local-sample.html',
  imports: [ReactiveFormsModule, Combobox],
})
export class ComboboxLocalSample {
  readonly localComboboxControl = new FormControl<string | null>(null);
  readonly localMultipleComboboxControl = new FormControl<string[]>([], { nonNullable: true });

  readonly localOptions: ComboboxOption<string>[] = new KlArray([
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
```
