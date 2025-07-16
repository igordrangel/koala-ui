```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldGroup } from '@koalarx/ui/shared/components/input-field/field-group';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';

@Component({
  selector: 'app-field-group-sample',
  templateUrl: './field-group-sample.html',
  imports: [FieldGroup, InputText],
})
export class FieldGroupSample {
  form = inject(FormBuilder).group({
    firstName: [''],
    lastName: [''],
    nickname: [''],
  });
}
```
