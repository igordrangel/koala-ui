import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-fieldset-login-sample',
  templateUrl: './fieldset-login.sample.html',
  imports: [FormField, Fieldset, Input, Button],
})
export class FieldsetLoginSample {
  readonly loginForm = form(signal({ email: '', password: '' }), (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Invalid email' });
    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Password must be at least 8 characters' });
  });
}
