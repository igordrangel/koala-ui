# Input Color

## Installation

```bash
kl install input-color
```

### HTML

```html
<app-input-color class="w-full max-w-sm" [formField]="colorForm.color" />
```

```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { InputColor } from '@/shared/components/input-color';

@Component({
  selector: 'app-input-color-sample',
  templateUrl: './input-color-sample.html',
  imports: [FormField, InputColor],
})
export class InputColorSample {
  private readonly colorModel = signal<{ color: string | null }>({ color: null });
  readonly colorForm = form(this.colorModel);
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.

### Inline

```html
<app-input-color inline clearable [formField]="colorForm.color" />
```
