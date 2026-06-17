```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { BottomSheetContainer, BottomSheetRef } from '@/shared/components/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-sample',
  templateUrl: './bottom-sheet-sample.html',
  imports: [BottomSheetContainer, Button],
})
export class BottomSheetSample {
  readonly bottomSheetRef = inject(BottomSheetRef);
}
```
