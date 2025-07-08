import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kl-field-errors',
  templateUrl: './field-errors.html',
})
export class FieldErrors {
  field = input.required<FormControl>();
}
