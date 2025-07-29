```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <form [formGroup]="form" (submit)="makeLogin()">
    <div class="flex flex-col w-full px-1 mb-2">
      <p class="font-bold">Access your account</p>
      <small class="opacity-80 font-normal text-sm">Please enter any username and password below to access your fake account</small>
    </div>

    <div class="flex flex-col w-full">
      <label class="text-sm font-semibold pl-1">Usuário</label>
      <kl-input-text class="col-12"
        [control]="form.controls.username"
      />
    </div>

    <div class="flex flex-col w-full">
      <label class="text-sm font-semibold pl-1">Senha</label>
      <kl-input-password class="col-12"
        [control]="form.controls.password"
      />
    </div>

    <button klButton class="w-full"
      type="submit"
      color="accent"
      [showLoader]="isAuthenticating()"
      [disabled]="form.invalid">
      Entrar
    </button>
  </form>
</div>
```
