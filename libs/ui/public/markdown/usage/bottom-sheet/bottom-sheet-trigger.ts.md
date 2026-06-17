```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { BottomSheet } from '@/shared/components/bottom-sheet';
import { BottomSheetSample } from './bottom-sheet-dialog-sample';

@Component({
  selector: 'app-bottom-sheet-trigger-sample',
  templateUrl: './bottom-sheet-trigger.sample.html',
  imports: [Button],
})
export class BottomSheetTriggerSample {
  private readonly bottomSheet = inject(BottomSheet);

  openModal() {
    this.bottomSheet.open(BottomSheetSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: false,
      },
    });
  }
}
```
