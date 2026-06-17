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
