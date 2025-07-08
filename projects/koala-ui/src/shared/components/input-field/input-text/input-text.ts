import { Component, input } from '@angular/core';
import { InputField } from '../input-field';
import { InputFieldBase } from '../input-field.base';

@Component({
  selector: 'kl-input-text',
  templateUrl: './input-text.html',
  imports: [InputField],
})
export class InputText extends InputFieldBase {
  mask = input<string>('');
}
