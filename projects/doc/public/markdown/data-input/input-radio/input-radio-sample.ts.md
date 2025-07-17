```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputRadio } from '@koalarx/ui/shared/components/input-field/input-radio';

@Component({
  selector: 'app-input-radio-sample',
  templateUrl: './input-radio-sample.html',
  imports: [InputRadio],
})
export class InputRadioSample {
  radioColorControl = new FormControl<number>(1);
  radioSizeControl = new FormControl<number>(1);
  disabledRadioControl = new FormControl<number | null>(null);
}
```
