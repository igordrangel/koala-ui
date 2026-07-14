```typescript
import { Credentials } from '@/core/models/credentials';
import { AuthorizationService } from '@/core/security/authorization.service';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Loading } from '@/shared/components/loading';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login-form-sample',
  templateUrl: './login-form.sample.html',
  imports: [FormField, Fieldset, Input, ValidatorHint, Button, Loading],
})
export class LoginFormSample {
  readonly authorization = inject(AuthorizationService);

  readonly credentialsForm = form(
    signal({ username: 'emilys', password: 'emilyspass' }),
    (schema) => {
      required(schema.username);
      required(schema.password);
      minLength(schema.password, 8);
    },
  );

  authenticate() {
    this.authorization.auth(this.credentialsForm().value() as Credentials);
  }
}
```

Reactive Forms still work via Angular 22 interop. Prefer Signal Forms (`form()` + `[formField]`) for new code.
