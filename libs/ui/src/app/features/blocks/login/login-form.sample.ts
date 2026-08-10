import { Credentials } from '@/core/models/credentials';
import { AuthorizationService } from '@/core/security/authorization.service';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Loading } from '@/shared/components/loading';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login-form-sample',
  templateUrl: './login-form.sample.html',
  imports: [FormField, Fieldset, Input, Button, Loading],
})
export class LoginFormSample {
  readonly authorization = inject(AuthorizationService);

  readonly credentialsForm = form(
    signal({ username: 'emilys', password: 'emilyspass' }),
    (schema) => {
      required(schema.username, { message: 'Username is required' });
      required(schema.password, { message: 'Password is required' });
      minLength(schema.password, 8, { message: 'Password must be at least 8 characters' });
    },
  );

  authenticate() {
    this.authorization.auth(this.credentialsForm().value() as Credentials);
  }
}
