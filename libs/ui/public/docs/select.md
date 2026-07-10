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
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Select, SelectOption } from '@/shared/components/select';

@Component({
  selector: 'app-select-sample',
  templateUrl: './select-sample.html',
  imports: [ReactiveFormsModule, Select],
})
export class SelectSample {
  singleControl = new FormControl<string | null>(null);
  multipleControl = new FormControl<string[]>([], { nonNullable: true });

  options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
}
```

### Multiple

```html
<app-select
  multiple
  placeholder="Select options"
  class="w-full max-w-sm"
  [options]="options"
  [formControl]="multipleControl"
/>
```

### Single

```html
<app-select
  class="w-full max-w-sm"
  placeholder="Select an option"
  [options]="options"
  [formControl]="singleControl"
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
