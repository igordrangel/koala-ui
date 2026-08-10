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
