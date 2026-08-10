```html
<app-fieldset [field]="cnpjForm.cnpj()">
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
</app-fieldset>
```
