```typescript
import { Component } from '@angular/core';
import { Button } from '@/shared/components/button';
import { Stepper } from '@/shared/components/stepper';

@Component({
  selector: 'app-stepper-sample',
  templateUrl: './stepper.sample.html',
  imports: [Stepper, Button],
})
export class StepperSample {}
```
