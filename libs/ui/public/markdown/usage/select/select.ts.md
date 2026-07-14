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
