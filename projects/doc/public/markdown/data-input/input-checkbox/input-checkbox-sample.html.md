```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <div class="flex flex-col items-center gap-4">
    <div class="flex items-center gap-4">
      <kl-input-checkbox [control]="checkboxControl" color="neutral" />
      <kl-input-checkbox [control]="checkboxControl" color="primary" />
      <kl-input-checkbox [control]="checkboxControl" color="secondary" />
      <kl-input-checkbox [control]="checkboxControl" color="accent" />
      <kl-input-checkbox [control]="checkboxControl" color="info" />
      <kl-input-checkbox [control]="checkboxControl" color="success" />
      <kl-input-checkbox [control]="checkboxControl" color="warning" />
      <kl-input-checkbox [control]="checkboxControl" color="error" />
    </div>

    <div class="flex items-center gap-4">
      <kl-input-checkbox [control]="checkboxControl" size="extraSmall" />
      <kl-input-checkbox [control]="checkboxControl" size="small" />
      <kl-input-checkbox [control]="checkboxControl" size="medium" />
      <kl-input-checkbox [control]="checkboxControl" size="large" />
      <kl-input-checkbox [control]="checkboxControl" size="extraLarge" />
    </div>

    <div class="flex items-center gap-4">
      <kl-input-checkbox [control]="disabledCheckboxControl" disabled />
    </div>
  </div>
</div>
```
