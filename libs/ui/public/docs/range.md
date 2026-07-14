# Range

## Installation

```bash
kl install range
```

### Disabled

```html
<input type="range" appRange disabled />
```

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

### Sizes

```html
<input type="range" appRange size="xs" [formField]="rangeForm.value" />
<input type="range" appRange size="sm" [formField]="rangeForm.value" />
<input type="range" appRange size="md" [formField]="rangeForm.value" />
<input type="range" appRange size="lg" [formField]="rangeForm.value" />
<input type="range" appRange size="xl" [formField]="rangeForm.value" />
```

### Variants

```html
<input type="range" appRange variant="neutral" [formField]="rangeForm.value" />
<input type="range" appRange variant="primary" [formField]="rangeForm.value" />
<input type="range" appRange variant="secondary" [formField]="rangeForm.value" />
<input type="range" appRange variant="accent" [formField]="rangeForm.value" />
<input type="range" appRange variant="info" [formField]="rangeForm.value" />
<input type="range" appRange variant="success" [formField]="rangeForm.value" />
<input type="range" appRange variant="warning" [formField]="rangeForm.value" />
<input type="range" appRange variant="error" [formField]="rangeForm.value" />
```
