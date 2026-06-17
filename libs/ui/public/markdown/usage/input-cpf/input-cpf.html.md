```html
<app-fieldset>
  <ng-container label>CPF</ng-container>
  <input
    field
    appInput
    type="text"
    placeholder="Type here"
    [formControl]="cpfControl"
    appMask="000.000.000-00"
  />
  <ng-container hint>Inform a valid CPF</ng-container>

  @if (cpfControl.hasError('required')) {
    <span appValidatorHint>CPF is required</span>
  } @else if (cpfControl.hasError('cpfInvalid')) {
    <span appValidatorHint>Invalid CPF</span>
  }
</app-fieldset>
```
