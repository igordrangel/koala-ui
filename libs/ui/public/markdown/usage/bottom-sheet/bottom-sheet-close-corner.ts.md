```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { BottomSheetContainer, BottomSheetRef } from '@/shared/components/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-close-corner-sample',
  templateUrl: './bottom-sheet-close-corner-sample.html',
  imports: [BottomSheetContainer, Button],
})
export class BottomSheetCloseCornerSample {
  readonly BottomSheetRef = inject(BottomSheetRef);
}
```
