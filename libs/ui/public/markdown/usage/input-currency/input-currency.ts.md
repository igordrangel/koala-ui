```typescript
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { CurrencyMask } from '@/shared/directives/currency.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-input-currency-sample',
  templateUrl: './input-currency-sample.html',
  imports: [FormField, Fieldset, Input, CurrencyMask],
})
export class InputCurrencySample {
  readonly currencyForm = form(signal({ currency: 0 as number | null }), (schema) => {
    required(schema.currency, { message: 'Currency is required' });
  });
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
