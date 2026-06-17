# Input CNPJ

## Installation

```bash
kl install input-cnpj
```

### HTML

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

```typescript
import { CnpjValidator } from '@/shared/validators/cnpj.validator';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-cnpj-sample',
  templateUrl: './input-cnpj-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCnpjSample {
  readonly cnpjControl = new FormControl<string>('', [Validators.required, CnpjValidator]);
}
```

### TypeScript

```typescript
import { CnpjValidator } from '@/shared/validators/cnpj.validator';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-cnpj-sample',
  templateUrl: './input-cnpj-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCnpjSample {
  readonly cnpjControl = new FormControl<string>('', [Validators.required, CnpjValidator]);
}
```
