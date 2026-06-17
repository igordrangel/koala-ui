# Bottom Sheet

## Installation

```bash
kl install bottom-sheet
```

### Close Corner

```html
<app-bottom-sheet>
  <div class="flex justify-between items-center" title>
    <span>Hello!</span>
    <button appButton circle variant="ghost" size="sm" (click)="bottomSheet.dismiss()">X</button>
  </div>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
</app-bottom-sheet>
```

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

### Sample

```html
<app-bottom-sheet>
  <ng-container title>Hello!</ng-container>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
  <ng-container actions>
    <button appButton (click)="bottomSheet.dismiss()">Close</button>
  </ng-container>
</app-bottom-sheet>
```

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

### Trigger

```html
<button appButton (click)="open()">open bottom sheet</button>
```

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

### Trigger Close Corner

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
