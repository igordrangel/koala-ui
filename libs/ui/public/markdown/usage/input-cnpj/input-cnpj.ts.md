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
