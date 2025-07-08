import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputMask } from '@koalarx/ui/shared/directives';
import { InputFieldBase } from './input-field.base';

type InputTypeField =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'search';

@Component({
  selector: 'kl-input-field',
  templateUrl: './input-field.html',
  imports: [ReactiveFormsModule, InputMask, FieldErrors],
})
export class InputField extends InputFieldBase {
  type = input<InputTypeField>('text');
  mask = input<string>('');
  min = input<string>();
  max = input<string>();
}
