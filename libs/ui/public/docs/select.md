# Select

## Installation

```bash
kl install select
```

### Disabled

```html
<app-select disabled class="w-56" placeholder="Disabled" [options]="options" />
```

```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Select, SelectOption } from '@/shared/components/select';

@Component({
  selector: 'app-select-sample',
  templateUrl: './select-sample.html',
  imports: [FormField, Select],
})
export class SelectSample {
  private readonly selectModel = signal<{ single: string | null; multiple: string[] }>({
    single: null,
    multiple: [],
  });
  readonly selectForm = form(this.selectModel);

  options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.

### Multiple

```html
<app-select
  multiple
  placeholder="Select options"
  class="w-full max-w-sm"
  [options]="options"
  [formField]="selectForm.multiple"
/>
```

### Single

```html
<app-select
  class="w-full max-w-sm"
  placeholder="Select an option"
  [options]="options"
  [formField]="selectForm.single"
/>
```

### Sizes

```html
<app-select size="xs" class="w-56" placeholder="xs" [options]="options" />
<app-select size="sm" class="w-56" placeholder="sm" [options]="options" />
<app-select size="md" class="w-56" placeholder="md" [options]="options" />
<app-select size="lg" class="w-56" placeholder="lg" [options]="options" />
<app-select size="xl" class="w-56" placeholder="xl" [options]="options" />
```
