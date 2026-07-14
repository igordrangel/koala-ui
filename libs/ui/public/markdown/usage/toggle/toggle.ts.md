```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Toggle } from '@/shared/components/toggle';

@Component({
  selector: 'app-toggle-sample',
  templateUrl: './toggle-sample.html',
  imports: [FormField, Toggle],
})
export class ToggleSample {
  private readonly toggleModel = signal({ checked: true });
  readonly toggleForm = form(this.toggleModel);
}
```

Reactive Forms still work via Angular 22 FormCheckboxControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
