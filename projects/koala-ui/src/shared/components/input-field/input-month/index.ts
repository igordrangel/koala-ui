import { Component, input } from '@angular/core';
import { InputField } from '..';
import { InputFieldBase } from '../input-field.base';

@Component({
  selector: 'kl-input-month',
  templateUrl: './input-month.html',
  imports: [InputField],
})
export class InputMonth extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
