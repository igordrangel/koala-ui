```html
<app-fieldset>
  <ng-container label>Currency</ng-container>
  <input
    field
    appInput
    type="text"
    placeholder="Type here"
    [formControl]="currencyControl"
    appCurrency
  />
  @if (currencyControl.hasError('required')) {
    <span appValidatorHint>Currency is required</span>
  }
</app-fieldset>
```
