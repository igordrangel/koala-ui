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
