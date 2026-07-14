```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Checkbox } from '@/shared/components/checkbox';

@Component({
  selector: 'app-checkbox-sample',
  templateUrl: './checkbox-sample.html',
  imports: [FormField, Checkbox],
})
export class CheckboxSample {
  private readonly checkboxModel = signal({ checked: true });
  readonly checkboxForm = form(this.checkboxModel);
}
```

Reactive Forms still work via Angular 22 FormCheckboxControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
