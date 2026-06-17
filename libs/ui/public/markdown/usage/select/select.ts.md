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
