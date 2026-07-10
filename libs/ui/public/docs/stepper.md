# Stepper

## Installation

```bash
kl install stepper
```

### HTML

```html
<app-stepper-container #stepper class="w-full">
  <ng-container steps>
    <span appStep>Step 1</span>
    <span appStep>Step 2</span>
    <span appStep>Step 3</span>
  </ng-container>

  @switch (stepper.currentStep()) {
    @case (1) {
      <form class="w-150 p-4">
        <h4>Step 1</h4>
        <span class="divider"></span>
        <div class="flex justify-end">
          <button type="button" appButton btnVariant="primary" (click)="stepper.next()">
            Next
          </button>
        </div>
      </form>
    }
    @case (2) {
      <form class="w-150 p-4">
        <h4>Step 2</h4>
        <span class="divider"></span>
        <div class="flex gap-2 justify-end">
          <button type="button" appButton btnVariant="primary" btnSoft (click)="stepper.previous()">
            Previous
          </button>
          <button type="button" appButton btnVariant="primary" (click)="stepper.next()">
            Next
          </button>
        </div>
      </form>
    }
    @case (3) {
      <form class="w-150 p-4">
        <h4>Step 3</h4>
        <span class="divider"></span>
        <div class="flex justify-end">
          <button type="button" appButton btnVariant="primary" btnSoft (click)="stepper.previous()">
            Previous
          </button>
        </div>
      </form>
    }
  }
</app-stepper-container>
```

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
