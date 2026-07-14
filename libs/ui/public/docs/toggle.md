# Toggle

## Installation

```bash
kl install toggle
```

### Disabled

```html
<input type="checkbox" appToggle disabled />
```

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

### Sizes

```html
<input type="checkbox" appToggle size="xs" />
<input type="checkbox" appToggle size="sm" />
<input type="checkbox" appToggle size="md" />
<input type="checkbox" appToggle size="lg" />
<input type="checkbox" appToggle size="xl" />
```

### Variants

```html
<input type="checkbox" appToggle variant="neutral" [formField]="toggleForm.checked" />
<input type="checkbox" appToggle variant="primary" [formField]="toggleForm.checked" />
<input type="checkbox" appToggle variant="secondary" [formField]="toggleForm.checked" />
<input type="checkbox" appToggle variant="accent" [formField]="toggleForm.checked" />
<input type="checkbox" appToggle variant="info" [formField]="toggleForm.checked" />
<input type="checkbox" appToggle variant="success" [formField]="toggleForm.checked" />
<input type="checkbox" appToggle variant="warning" [formField]="toggleForm.checked" />
<input type="checkbox" appToggle variant="error" [formField]="toggleForm.checked" />
```
