import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset.sample.html',
  imports: [FormField, Fieldset, Input],
})
export class FieldsetSample {
  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Invalid email' });
  });
}
