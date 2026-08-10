import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';
import { ValidatorHint } from '../validator/validator-hint';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.html',
  imports: [ValidatorHint],
})
export class Fieldset {
  field = input.required<FieldState<any, any>>();
}
