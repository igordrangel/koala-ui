```html
<app-fieldset>
  <ng-container label>Currency</ng-container>
  <input
    field
    appInput
    type="text"
    placeholder="Type here"
    [formField]="currencyForm.currency"
    appCurrency
  />
  @if (currencyForm.currency().getError('required')) {
    <span appValidatorHint>Currency is required</span>
  }
</app-fieldset>
```
