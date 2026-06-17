```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '@/core/models/credentials';
import { AuthorizationService } from '@/core/security/authorization.service';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Loading } from '@/shared/components/loading';

@Component({
  selector: 'app-login-form-sample',
  templateUrl: './login-form.sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, ValidatorHint, Button, Loading],
})
export class LoginFormSample {
  readonly authorization = inject(AuthorizationService);

  readonly formCredentials = inject(FormBuilder).group({
    username: new FormControl('emilys', Validators.required),
    password: new FormControl('emilyspass', [Validators.required, Validators.minLength(8)]),
  });

  authenticate() {
    this.authorization.auth(this.formCredentials.value as Credentials);
  }
}
```
