```typescript
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { validateCnpj } from '@koalarx/utils/KlString';

@Component({
  selector: 'app-input-cnpj-sample',
  templateUrl: './input-cnpj-sample.html',
  imports: [FormField, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCnpjSample {
  readonly cnpjForm = form(signal({ cnpj: '' }), (schema) => {
    required(schema.cnpj);
    validate(schema.cnpj, ({ value }) => {
      const current = value();
      if (!current) {
        return undefined;
      }

      return validateCnpj(current) ? undefined : { kind: 'cnpjInvalid' };
    });
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `CnpjValidator`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
