import { Component, input } from '@angular/core';
import { InputField } from '..';
import { InputFieldBase } from '../input-field.base';

@Component({
  selector: 'kl-input-date',
  templateUrl: './input-date.html',
  imports: [InputField],
})
export class InputDate extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
