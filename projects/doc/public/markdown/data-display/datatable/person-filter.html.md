```html
<form [formGroup]="form" (submit)="sendFilter()">
  <kl-side-window-content>
    <div class="flex flex-col h-full">
      <h2 class="p-4 opacity-60 font-light tracking-widest border-b border-gray-200 dark:border-gray-700">
        Search Person
      </h2>

      <div class="min-w-[25vw] max-w-[60vw] p-4 h-full overflow-y-auto">
        <kl-field-group>
          <kl-input-text class="col-6"
            label="First Name"
            [control]="form.controls.firstName"
          />
          <kl-input-text class="col-6"
            label="Last Name"
            [control]="form.controls.lastName"
          />
        </kl-field-group>

        <kl-input-email class="col-12"
          label="Email"
          [control]="form.controls.email"
        />
      </div>

      <div class="flex items-center justify-between gap-1 p-4 border-t border-gray-200 dark:border-gray-700">
        <button klButton
          color="error"
          soft
          (click)="close()">
          Cancel
        </button>

        <button
          klButton
          type="submit"
          color="primary"
          [showLoader]="sendingData()">
          Search
        </button>
      </div>
    </div>
  </kl-side-window-content>
</form>
```
