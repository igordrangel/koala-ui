```html
<app-fieldset>
  <ng-container label>CNPJ</ng-container>
  <input
    field
    appInput
    type="text"
    placeholder="Type here"
    [formField]="cnpjForm.cnpj"
    appMask="SS.SSS.SSS/SSSS-SS"
  />
  <ng-container hint>Inform a valid CNPJ</ng-container>

  @if (cnpjForm.cnpj().getError('required')) {
    <span appValidatorHint>CNPJ is required</span>
  } @else if (cnpjForm.cnpj().getError('cnpjInvalid')) {
    <span appValidatorHint>Invalid CNPJ</span>
  }
</app-fieldset>
```
