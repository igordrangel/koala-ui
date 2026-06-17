```html
<app-fieldset>
  <ng-container label>CNPJ</ng-container>
  <input
    field
    appInput
    type="text"
    placeholder="Type here"
    [formControl]="cnpjControl"
    appMask="SS.SSS.SSS/SSSS-SS"
  />
  <ng-container hint>Inform a valid CNPJ</ng-container>

  @if (cnpjControl.hasError('required')) {
    <span appValidatorHint>CNPJ is required</span>
  } @else if (cnpjControl.hasError('cnpjInvalid')) {
    <span appValidatorHint>Invalid CNPJ</span>
  }
</app-fieldset>
```
