# Fieldset

## Installation

```bash
kl install fieldset
```

### HTML

```html
<app-fieldset>
  <ng-container label>What is your email?</ng-container>
  <input field appInput type="text" placeholder="Type here" [formControl]="emailControl" />
  <ng-container hint>Inform a valid email address</ng-container>

  @if (emailControl.hasError('required')) {
    <span appValidatorHint>Email is required</span>
  } @else if (emailControl.hasError('email')) {
    <span appValidatorHint>Invalid email</span>
  }
</app-fieldset>
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, ValidatorHint],
})
export class FieldsetSample {
  readonly emailControl = new FormControl<string>('', [Validators.required, Validators.email]);
}
```

### Login Sample

```html
<form class="flex flex-col items-center justify-center gap-2" [formGroup]="loginForm">
  <app-fieldset class="w-full max-w-xs">
    <ng-container label>E-mail</ng-container>
    <input
      field
      appInput
      size="md"
      type="email"
      placeholder="example@example.com"
      [formControl]="loginForm.controls.email"
    />

    @if (loginForm.controls.email.hasError('required')) {
      <span appValidatorHint>Email is required</span>
    } @else if (loginForm.controls.email.hasError('email')) {
      <span appValidatorHint>Invalid email</span>
    }
  </app-fieldset>

  <app-fieldset class="w-full max-w-xs">
    <ng-container label>Password</ng-container>
    <input
      #inputPassword
      field
      appInput
      size="md"
      type="password"
      [formControl]="loginForm.controls.password"
    />

    <ng-container action>
      @if (inputPassword.type === 'password') {
        <button
          type="button"
          appButton
          btnCircle
          btnVariant="ghost"
          (click)="inputPassword.type = 'text'"
        >
          <i class="fa-regular fa-eye-slash"></i>
        </button>
      } @else {
        <button
          type="button"
          appButton
          btnCircle
          btnVariant="ghost"
          (click)="inputPassword.type = 'password'"
        >
          <i class="fa-regular fa-eye"></i>
        </button>
      }
    </ng-container>

    @if (loginForm.controls.password.hasError('required')) {
      <span appValidatorHint>Password is required</span>
    } @else if (loginForm.controls.password.hasError('minlength')) {
      <span appValidatorHint>Password must be at least 8 characters</span>
    }
  </app-fieldset>

  <div class="flex w-full max-w-xs">
    <button type="button" appButton btnVariant="primary" class="w-full">Entrar</button>
  </div>
</form>
```

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

### TypeScript

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, ValidatorHint],
})
export class FieldsetSample {
  readonly emailControl = new FormControl<string>('', [Validators.required, Validators.email]);
}
```
