```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <div class="flex flex-col items-center gap-4">
    <div class="flex items-center gap-4">
      <kl-switcher [control]="switcherControl" color="neutral" />
      <kl-switcher [control]="switcherControl" color="primary" />
      <kl-switcher [control]="switcherControl" color="secondary" />
      <kl-switcher [control]="switcherControl" color="accent" />
      <kl-switcher [control]="switcherControl" color="info" />
      <kl-switcher [control]="switcherControl" color="success" />
      <kl-switcher [control]="switcherControl" color="warning" />
      <kl-switcher [control]="switcherControl" color="error" />
    </div>

    <div class="flex items-center gap-4">
      <kl-switcher [control]="switcherControl" size="extraSmall" />
      <kl-switcher [control]="switcherControl" size="small" />
      <kl-switcher [control]="switcherControl" size="medium" />
      <kl-switcher [control]="switcherControl" size="large" />
      <kl-switcher [control]="switcherControl" size="extraLarge" />
    </div>

    <div class="flex items-center gap-4">
      <kl-switcher [control]="disabledSwitcherControl" disabled />
    </div>
  </div>
</div>
```
