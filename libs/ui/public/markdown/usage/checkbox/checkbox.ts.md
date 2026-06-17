```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from '@/shared/components/checkbox';

@Component({
  selector: 'app-checkbox-sample',
  templateUrl: './checkbox-sample.html',
  imports: [ReactiveFormsModule, Checkbox],
})
export class CheckboxSample {
  checkboxControl = new FormControl<boolean>(true);
}
```
