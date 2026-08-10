```typescript
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';

@Component({
  selector: 'app-login-sample',
  templateUrl: './login-sample.html',
  imports: [FormField, Fieldset, Input, Button],
})
export class LoginSample {
  readonly loginForm = form(signal({ email: '', password: '' }), (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Invalid email' });
    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Password must be at least 8 characters' });
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `Validators`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
