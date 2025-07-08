import { Component, input } from '@angular/core';
import { InputField } from '..';
import { InputFieldBase } from '../input-field.base';

@Component({
  selector: 'kl-input-time',
  templateUrl: './input-time.html',
  imports: [InputField],
})
export class InputTime extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
