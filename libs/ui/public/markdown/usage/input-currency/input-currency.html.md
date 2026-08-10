```html
<app-fieldset [field]="currencyForm.currency()">
  <ng-container label>Currency</ng-container>
  <input
    field
    appInput
    type="text"
    placeholder="Type here"
    [formField]="currencyForm.currency"
    appCurrency
  />
</app-fieldset>
```
