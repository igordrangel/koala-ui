# Input CPF

## Installation

```bash
kl install input-cpf
```

### HTML

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

```typescript
import { CpfValidator } from '@/shared/validators/cpf.validator';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-cpf-sample',
  templateUrl: './input-cpf-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCpfSample {
  readonly cpfControl = new FormControl<string>('', [Validators.required, CpfValidator]);
}
```

### TypeScript

```typescript
import { CpfValidator } from '@/shared/validators/cpf.validator';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-cpf-sample',
  templateUrl: './input-cpf-sample.html',
  imports: [ReactiveFormsModule, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCpfSample {
  readonly cpfControl = new FormControl<string>('', [Validators.required, CpfValidator]);
}
```
