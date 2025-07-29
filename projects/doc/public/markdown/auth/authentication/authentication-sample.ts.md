```typescript
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputPassword } from '@koalarx/ui/shared/components/input-field/input-password';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';
import { Button } from '@koalarx/ui/shared/directives';
import { Authorization } from '@koalarx/ui/shared/services/authorization';
import { first } from 'rxjs/internal/operators/first';

interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}

@Component({
  selector: 'app-authentication-sample',
  templateUrl: './authentication-sample.html',
  imports: [
    ReactiveFormsModule,
    InputText,
    InputPassword,
    Button,
  ],
})
export class AuthenticationSample {
  private readonly authorization = inject(Authorization);
  private readonly http = inject(HttpClient);

  isAuthenticating = signal<boolean>(false);

  form = inject(FormBuilder).group({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  makeLogin() {
    this.isAuthenticating.set(true);

    this.http
      .post<AuthenticationResponse>(
        'https://dummyjson.com/auth/login',
        this.form.getRawValue()
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.authorization.accessToken = response.accessToken;
          this.authorization.refreshToken = response.refreshToken;
          this.isAuthenticating.set(false);
        },
        error: () => this.isAuthenticating.set(false),
      });
  }
}
```
