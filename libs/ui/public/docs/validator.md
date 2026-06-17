# Validator

## Installation

```bash
kl install validator
```

### HTML

```html
<input field appInput type="text" placeholder="Type here" [formControl]="emailControl" />

@if (emailControl.hasError('required')) {
  <span appValidatorHint>Email is required</span>
} @else if (emailControl.hasError('email')) {
  <span appValidatorHint>Invalid email</span>
}
```

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

### TypeScript

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
