# Fieldset

## Installation

```bash
kl install fieldset
```

### HTML

```html
<app-fieldset>
  <ng-container label>What is your email?</ng-container>
  <input field appInput type="text" placeholder="Type here" [formField]="emailForm.email" />
  <ng-container hint>Inform a valid email address</ng-container>

  @if (emailForm.email().getError('required')) {
    <span appValidatorHint>Email is required</span>
  } @else if (emailForm.email().getError('email')) {
    <span appValidatorHint>Invalid email</span>
  }
</app-fieldset>
```

```typescript
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset-sample.html',
  imports: [FormField, Fieldset, Input, ValidatorHint],
})
export class FieldsetSample {
  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `Validators`). Prefer Signal Forms (`form()` + `[formField]`) for new code.

### Login Sample

```html
<form class="flex flex-col items-center justify-center gap-2">
  <app-fieldset class="w-full max-w-xs">
    <ng-container label>E-mail</ng-container>
    <input
      field
      appInput
      size="md"
      type="email"
      placeholder="example@example.com"
      [formField]="loginForm.email"
    />

    @if (loginForm.email().getError('required')) {
      <span appValidatorHint>Email is required</span>
    } @else if (loginForm.email().getError('email')) {
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
      [formField]="loginForm.password"
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

    @if (loginForm.password().getError('required')) {
      <span appValidatorHint>Password is required</span>
    } @else if (loginForm.password().getError('minLength')) {
      <span appValidatorHint>Password must be at least 8 characters</span>
    }
  </app-fieldset>

  <div class="flex w-full max-w-xs">
    <button type="button" appButton btnVariant="primary" class="w-full">Entrar</button>
  </div>
</form>
```

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
