import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset.sample.html',
  imports: [FormField, Fieldset, Input, ValidatorHint],
})
export class FieldsetSample {
  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
  });
}
