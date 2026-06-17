```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { SideWindow } from '@/shared/components/side-window';
import { SideWindowSample } from './side-window-dialog-sample';

@Component({
  selector: 'app-side-window-trigger-sample',
  templateUrl: './modal-trigger.sample.html',
  imports: [Button],
})
export class SideWindowTriggerSample {
  private readonly sideWindow = inject(SideWindow);

  openModal() {
    this.sideWindow.open(SideWindowSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: false,
      },
    });
  }
}
```
