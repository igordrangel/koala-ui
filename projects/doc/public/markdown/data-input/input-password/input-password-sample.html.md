```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <kl-field-group>
    <kl-input-password class="col-12"
      label="Password"
      [control]="form.controls.password"
      enableStrongPasswordCheck
    />
    <kl-input-password class="col-12"
      label="Confirm Password"
      [control]="form.controls.confirmPassword"
    />
  </kl-field-group>
</div>
```
