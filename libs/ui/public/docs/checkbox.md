# Checkbox

## Installation

```bash
kl install checkbox
```

### Disabled

```html
<input type="checkbox" appCheckbox disabled />
```

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

### Sizes

```html
<input type="checkbox" appCheckbox size="xs" />
<input type="checkbox" appCheckbox size="sm" />
<input type="checkbox" appCheckbox size="md" />
<input type="checkbox" appCheckbox size="lg" />
<input type="checkbox" appCheckbox size="xl" />
```

### Variants

```html
<input type="checkbox" appCheckbox variant="neutral" [formField]="checkboxForm.checked" />
<input type="checkbox" appCheckbox variant="primary" [formField]="checkboxForm.checked" />
<input type="checkbox" appCheckbox variant="secondary" [formField]="checkboxForm.checked" />
<input type="checkbox" appCheckbox variant="accent" [formField]="checkboxForm.checked" />
<input type="checkbox" appCheckbox variant="info" [formField]="checkboxForm.checked" />
<input type="checkbox" appCheckbox variant="success" [formField]="checkboxForm.checked" />
<input type="checkbox" appCheckbox variant="warning" [formField]="checkboxForm.checked" />
<input type="checkbox" appCheckbox variant="error" [formField]="checkboxForm.checked" />
```
