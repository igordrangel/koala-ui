```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Range } from '@/shared/components/range';

@Component({
  selector: 'app-range-sample',
  templateUrl: './range-sample.html',
  imports: [FormField, Range],
})
export class RangeSample {
  private readonly rangeModel = signal({ value: 50 });
  readonly rangeForm = form(this.rangeModel);
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
