```typescript
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { CurrencyMask } from '@/shared/directives/currency.directive';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-currency-sample',
  templateUrl: './input-currency-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, CurrencyMask, ValidatorHint],
})
export class InputCurrencySample {
  readonly currencyControl = new FormControl<number>(0, Validators.required);
}
```
