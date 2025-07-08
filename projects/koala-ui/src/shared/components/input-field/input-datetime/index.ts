import { Component, input } from '@angular/core';
import { InputField } from '..';
import { InputFieldBase } from '../input-field.base';

@Component({
  selector: 'kl-input-datetime',
  templateUrl: './input-datetime.html',
  imports: [InputField],
})
export class InputDatetime extends InputFieldBase {
  min = input<string>();
  max = input<string>();
}
