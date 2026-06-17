```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';

@Component({
  selector: 'app-validator-sample',
  templateUrl: './validator-sample.html',
  imports: [ReactiveFormsModule, InputField, ValidatorHint],
})
export class ValidatorSample {
  readonly emailControl = new FormControl<string>('', [Validators.required, Validators.email]);
}
```
