```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Radio } from '@/shared/components/radio';

@Component({
  selector: 'app-radio-sample',
  templateUrl: './radio-sample.html',
  imports: [FormField, Radio],
})
export class RadioSample {
  private readonly radioModel = signal({ value: '' });
  readonly radioForm = form(this.radioModel);
}
```

Reactive Forms still work via Angular 22 interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
