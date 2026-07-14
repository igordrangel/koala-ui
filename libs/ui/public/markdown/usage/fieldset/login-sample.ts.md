```typescript
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';

@Component({
  selector: 'app-login-sample',
  templateUrl: './login-sample.html',
  imports: [FormField, Fieldset, Input, ValidatorHint, Button],
})
export class LoginSample {
  readonly loginForm = form(signal({ email: '', password: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 8);
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `Validators`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
