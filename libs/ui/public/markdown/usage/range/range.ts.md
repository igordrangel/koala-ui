```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Range } from '@/shared/components/range';

@Component({
  selector: 'app-range-sample',
  templateUrl: './range-sample.html',
  imports: [ReactiveFormsModule, Range],
})
export class RangeSample {
  rangeControl = new FormControl<number>(50);
}
```
