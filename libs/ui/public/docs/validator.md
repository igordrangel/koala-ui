# Validator

## Installation

```bash
kl install validator
```

### HTML

```html
<input field appInput type="text" placeholder="Type here" [formField]="emailForm.email" />

@if (emailForm.email().getError('required')) {
  <span appValidatorHint>Email is required</span>
} @else if (emailForm.email().getError('email')) {
  <span appValidatorHint>Invalid email</span>
}
```

```typescript
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';

@Component({
  selector: 'app-validator-sample',
  templateUrl: './validator-sample.html',
  imports: [FormField, Input, ValidatorHint],
})
export class ValidatorSample {
  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `Validators`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
