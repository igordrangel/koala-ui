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
    [formField]="cpfForm.cpf"
    appMask="000.000.000-00"
  />
  <ng-container hint>Inform a valid CPF</ng-container>

  @if (cpfForm.cpf().getError('required')) {
    <span appValidatorHint>CPF is required</span>
  } @else if (cpfForm.cpf().getError('cpfInvalid')) {
    <span appValidatorHint>Invalid CPF</span>
  }
</app-fieldset>
```

```typescript
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { validateCpf } from '@koalarx/utils/KlString';

@Component({
  selector: 'app-input-cpf-sample',
  templateUrl: './input-cpf-sample.html',
  imports: [FormField, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCpfSample {
  readonly cpfForm = form(signal({ cpf: '' }), (schema) => {
    required(schema.cpf);
    validate(schema.cpf, ({ value }) => {
      const current = value();
      if (!current) {
        return undefined;
      }

      return validateCpf(current) ? undefined : { kind: 'cpfInvalid' };
    });
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `CpfValidator`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
