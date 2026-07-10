```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '@/shared/components/input-color';

@Component({
  selector: 'app-input-color-sample',
  templateUrl: './input-color-sample.html',
  imports: [ReactiveFormsModule, InputColor],
})
export class InputColorSample {
  colorControl = new FormControl<string | null>(null);
}
```
