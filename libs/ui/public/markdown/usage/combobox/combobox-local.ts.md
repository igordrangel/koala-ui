```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Combobox, ComboboxOption } from '@/shared/components/combobox';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-combobox-local-sample',
  templateUrl: './combobox-local-sample.html',
  imports: [FormField, Combobox],
})
export class ComboboxLocalSample {
  private readonly comboboxModel = signal<{ local: string | null; localMultiple: string[] }>({
    local: null,
    localMultiple: [],
  });
  readonly comboboxForm = form(this.comboboxModel);

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

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
