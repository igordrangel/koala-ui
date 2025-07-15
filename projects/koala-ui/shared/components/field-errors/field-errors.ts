import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrentTranslation } from '@koalarx/ui/core/translations/current-language';

@Component({
  selector: 'kl-field-errors',
  templateUrl: './field-errors.html',
})
export class FieldErrors {
  readonly translations = CurrentTranslation.get().form;
  field = input.required<FormControl>();
}
