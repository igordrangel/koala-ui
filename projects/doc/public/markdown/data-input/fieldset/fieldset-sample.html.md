```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <kl-fieldset>
    <ng-container legend>Dados Pessoais</ng-container>

    <ng-container fields>
      <kl-input-text class="col-6"
        label="First Name"
        [control]="form.controls.firstName"
      />

      <kl-input-text class="col-6"
        label="Last Name"
        [control]="form.controls.lastName"
      />

      <kl-input-text class="col-12"
        label="Nickname"
        [control]="form.controls.nickname"
      />
    </ng-container>
  </kl-fieldset>
</div>
```
