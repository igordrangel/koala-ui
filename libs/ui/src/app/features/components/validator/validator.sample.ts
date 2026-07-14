import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-validator-sample',
  templateUrl: './validator.sample.html',
  imports: [FormField, Input, ValidatorHint],
})
export class ValidatorSample {
  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
  });
}
