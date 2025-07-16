```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputCurrency } from '@koalarx/ui/shared/components/input-field/input-currency';

@Component({
  selector: 'app-input-currency-sample',
  templateUrl: './input-currency-sample.html',
  imports: [InputCurrency],
})
export class InputCurrencySample {
  currencyControl = new FormControl<number>(0);
}
```
