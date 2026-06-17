```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Toggle } from '@/shared/components/toggle';

@Component({
  selector: 'app-toggle-sample',
  templateUrl: './toggle-sample.html',
  imports: [ReactiveFormsModule, Toggle],
})
export class ToggleSample {
  toggleControl = new FormControl<boolean>(true);
}
```
