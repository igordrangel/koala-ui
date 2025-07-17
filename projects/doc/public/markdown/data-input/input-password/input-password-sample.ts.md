```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FieldGroup } from '@koalarx/ui/shared/components/input-field/field-group';
import { InputPassword } from '@koalarx/ui/shared/components/input-field/input-password';
import { ConfirmPasswordValidator } from '@koalarx/ui/shared/validators';

@Component({
  selector: 'app-input-password-sample',
  templateUrl: './input-password-sample.html',
  imports: [FieldGroup, InputPassword],
})
export class InputPasswordSample {
  form = inject(FormBuilder).group({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [
      Validators.required,
      ConfirmPasswordValidator('password'),
    ]),
  });
}
```
