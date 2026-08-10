# Fieldset

## Installation

```bash
kl install fieldset
```

### HTML

```html
<app-fieldset [field]="emailForm.email()">
  <ng-container label>What is your email?</ng-container>
  <input field appInput type="text" placeholder="Type here" [formField]="emailForm.email" />
  <ng-container hint>Inform a valid email address</ng-container>
</app-fieldset>
```

```typescript
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset-sample.html',
  imports: [FormField, Fieldset, Input],
})
export class FieldsetSample {
  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Invalid email' });
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `Validators`). Prefer Signal Forms (`form()` + `[formField]`) for new code.

### Login Sample

```html
<form class="flex flex-col items-center justify-center gap-2">
  <app-fieldset [field]="loginForm.email()" class="w-full max-w-xs">
    <ng-container label>E-mail</ng-container>
    <input
      field
      appInput
      size="md"
      type="email"
      placeholder="example@example.com"
      [formField]="loginForm.email"
    />
  </app-fieldset>

  <app-fieldset [field]="loginForm.password()" class="w-full max-w-xs">
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
