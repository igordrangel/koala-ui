# Input CNPJ

## Installation

```bash
kl install input-cnpj
```

### HTML

```html
<app-fieldset [field]="cnpjForm.cnpj()">
  <ng-container label>CNPJ</ng-container>
  <input
    field
    appInput
    type="text"
    placeholder="Type here"
    [formField]="cnpjForm.cnpj"
    appMask="SS.SSS.SSS/SSSS-SS"
  />
  <ng-container hint>Inform a valid CNPJ</ng-container>
</app-fieldset>
```

```typescript
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { validateCnpj } from '@koalarx/utils/KlString';

@Component({
  selector: 'app-input-cnpj-sample',
  templateUrl: './input-cnpj-sample.html',
  imports: [FormField, Fieldset, Input, Mask],
})
export class InputCnpjSample {
  readonly cnpjForm = form(signal({ cnpj: '' }), (schema) => {
    required(schema.cnpj, { message: 'CNPJ is required' });
    validate(schema.cnpj, ({ value }) => {
      const current = value();
      if (!current) {
        return undefined;
      }

      return validateCnpj(current)
        ? undefined
        : { kind: 'cnpjInvalid', message: 'Invalid CNPJ' };
    });
  });
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName` + `CnpjValidator`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
