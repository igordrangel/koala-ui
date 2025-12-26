import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { InputCurrencyMask } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'kl-input-currency',
  templateUrl: './input-currency.html',
  imports: [ReactiveFormsModule, FormsModule, InputCurrencyMask, FieldErrors],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCurrency extends InputFieldBase {
  decimalCount = input<number>(2);
  currentValue = linkedSignal(() => this.control().value);
}
