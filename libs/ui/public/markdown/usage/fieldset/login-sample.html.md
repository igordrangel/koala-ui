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
