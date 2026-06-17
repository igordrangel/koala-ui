```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { SideWindow } from '@/shared/components/side-window';
import { SideWindowCloseCornerSample } from './side-window-dialog-close-corner-sample';

@Component({
  selector: 'app-side-window-trigger-close-corner-sample',
  templateUrl: './side-window-trigger-close-corner.sample.html',
  imports: [Button],
})
export class SideWindowTriggerCloseCornerSample {
  private readonly sideWindow = inject(SideWindow);

  openModal() {
    this.sideWindow.open(SideWindowCloseCornerSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: false,
      },
    });
  }
}
```
