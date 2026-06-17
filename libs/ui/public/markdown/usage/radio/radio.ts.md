```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Radio } from '@/shared/components/radio';

@Component({
  selector: 'app-radio-sample',
  templateUrl: './radio-sample.html',
  imports: [ReactiveFormsModule, Radio],
})
export class RadioSample {
  radioControl = new FormControl<string>('');
}
```
