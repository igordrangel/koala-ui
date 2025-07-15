```typescript
import { Component, inject } from '@angular/core';
import {
  StepGroup,
  StepItem,
  Stepper,
} from '@koalarx/ui/shared/components/stepper';
import { Button } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'app-stepper-sample',
  templateUrl: './stepper-sample.html',
  providers: [Stepper],
  imports: [Button, StepGroup, StepItem],
})
export class StepperSample {
  stepper = inject(Stepper);
}
```
