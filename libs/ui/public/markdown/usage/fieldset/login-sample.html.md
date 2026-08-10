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
