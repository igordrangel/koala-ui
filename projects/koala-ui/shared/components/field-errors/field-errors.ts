import { Component, inject, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppConfig } from '@koalarx/ui/core/config';

@Component({
  selector: 'kl-field-errors',
  templateUrl: './field-errors.html',
})
export class FieldErrors {
  readonly translations = inject(AppConfig).translation.form;
  field = input.required<FormControl>();
}
