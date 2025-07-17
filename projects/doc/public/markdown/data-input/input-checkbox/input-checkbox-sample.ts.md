```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputCheckbox } from '@koalarx/ui/shared/components/input-field/input-checkbox';

@Component({
  selector: 'app-input-checkbox-sample',
  templateUrl: './input-checkbox-sample.html',
  imports: [InputCheckbox],
})
export class InputCheckboxSample {
  checkboxControl = new FormControl<boolean>(true);
  disabledCheckboxControl = new FormControl<boolean>(false);
}
```
