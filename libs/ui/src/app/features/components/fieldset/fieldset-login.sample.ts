import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-fieldset-login-sample',
  templateUrl: './fieldset-login.sample.html',
  imports: [FormField, Fieldset, Input, ValidatorHint, Button],
})
export class FieldsetLoginSample {
  readonly loginForm = form(signal({ email: '', password: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 8);
  });
}
