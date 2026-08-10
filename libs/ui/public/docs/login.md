# Login

## Installation

```bash
kl install fieldset,input-field,validator,button,loading,skeleton,auth
```

### Logged Sample

```html
@if (authorization.loggedUser(); as loggedUser) {
  <div class="flex flex-col items-center justify-center gap-4 py-20">
    <div class="avatar">
      @if (avatarLoading()) {
        <app-skeleton variant="circle" class="w-24 h-24 absolute inset-0" />
      }

      <div
        class="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 relative transition-opacity duration-300"
        [class.opacity-0]="avatarLoading()"
      >
        <img [src]="loggedUser.avatar" (load)="avatarLoading.set(false)" />
      </div>
    </div>

    <span>{{ loggedUser.name }}</span>
    <div class="join">
      <button appButton btnVariant="primary" (click)="authorization.updateToken().subscribe()">
        Refresh Token
      </button>
      <button appButton btnVariant="error" (click)="authorization.logout()">Logout</button>
    </div>
  </div>
}
```

```typescript
import { Component, inject, signal } from '@angular/core';
import { AuthorizationService } from '@/core/security/authorization.service';
import { Button } from '@/shared/components/button';
import { Skeleton } from '@/shared/components/skeleton';

@Component({
  selector: 'app-logged-sample',
  templateUrl: './logged-sample.html',
  imports: [Button, Skeleton],
})
export class LoggedSample {
  readonly avatarLoading = signal(true);
  readonly authorization = inject(AuthorizationService);
}
```

### Form

```html
<form
  class="flex flex-col items-center justify-center py-20 gap-2"
  (submit)="$event.preventDefault(); authenticate()"
>
  <app-fieldset [field]="credentialsForm.username()" class="w-full max-w-xs">
    <ng-container label>Username</ng-container>
    <input
      field
      appInput
      size="md"
      type="text"
      placeholder="Enter your username"
      [formField]="credentialsForm.username"
    />
  </app-fieldset>

  <app-fieldset [field]="credentialsForm.password()" class="w-full max-w-xs">
    <ng-container label>Password</ng-container>
    <input
      #inputPassword
      field
      appInput
      size="md"
      type="password"
      [formField]="credentialsForm.password"
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
    @let logingIn = authorization.event()?.type === 'loginInProgress';

    <button
      type="submit"
      appButton
      btnVariant="primary"
      class="w-full"
      [disabled]="logingIn || credentialsForm().invalid()"
    >
      @if (logingIn) {
        <app-loading size="sm"></app-loading>
      }

      Login
    </button>
  </div>
</form>
```

```typescript
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
```

Reactive Forms still work via Angular 22 interop. Prefer Signal Forms (`form()` + `[formField]`) for new code.
