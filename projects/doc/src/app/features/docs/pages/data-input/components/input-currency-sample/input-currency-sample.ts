import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { afterRenderEffect, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputCurrency } from '@koalarx/ui/shared/components/input-field/input-currency';

@Component({
  selector: 'app-input-currency-sample',
  templateUrl: './input-currency-sample.html',
  imports: [SampleContainer, InputCurrency],
})
export class InputCurrencySample {
  currencyControl = new FormControl<number>(0);

  constructor() {
    afterRenderEffect(() => {
      setTimeout(() => {
        this.currencyControl.setValue(1234.5);
      });
    });
  }
}
