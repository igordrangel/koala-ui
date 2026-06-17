```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';

@Component({
  selector: 'app-login-sample',
  templateUrl: './login-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, ValidatorHint, Button],
})
export class LoginSample {
  readonly loginForm = inject(FormBuilder).group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  });
}
```
