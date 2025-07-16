```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Fieldset } from '@koalarx/ui/shared/components/input-field/fieldset';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';

@Component({
  selector: 'app-fieldset-sample',
  templateUrl: './fieldset-sample.html',
  imports: [Fieldset, InputText],
})
export class FieldsetSample {
  form = inject(FormBuilder).group({
    firstName: [''],
    lastName: [''],
    nickname: [''],
  });
}
```
