```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Switcher } from '@koalarx/ui/shared/components/input-field/switcher';

@Component({
  selector: 'app-switcher-sample',
  templateUrl: './switcher-sample.html',
  imports: [Switcher],
})
export class SwitcherSample {
  switcherControl = new FormControl<boolean>(true);
  disabledSwitcherControl = new FormControl<boolean>(false);
}
```
