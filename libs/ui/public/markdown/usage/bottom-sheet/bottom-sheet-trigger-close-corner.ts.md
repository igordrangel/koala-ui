```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { BottomSheet } from '@/shared/components/bottom-sheet';
import { BottomSheetCloseCornerSample } from './bottom-sheet-dialog-close-corner-sample';

@Component({
  selector: 'app-bottom-sheet-trigger-close-corner-sample',
  templateUrl: './bottom-sheet-trigger-close-corner.sample.html',
  imports: [Button],
})
export class BottomSheetTriggerCloseCornerSample {
  private readonly bottomSheet = inject(BottomSheet);

  openModal() {
    this.bottomSheet.open(BottomSheetCloseCornerSample, {
      closeOptions: {
        pressEscape: true,
        clickOutside: false,
      },
    });
  }
}
```
