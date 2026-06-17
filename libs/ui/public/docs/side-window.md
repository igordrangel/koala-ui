# Side Window

## Installation

```bash
kl install side-window
```

### Close Corner

```html
<app-side-window>
  <div class="flex justify-between items-center" title>
    <span>Hello!</span>
    <button appButton circle variant="ghost" size="sm" (click)="sideWindowRef.dismiss()">X</button>
  </div>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
</app-side-window>
```

```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { SideWindowContainer, SideWindowRef } from '@/shared/components/side-window';

@Component({
  selector: 'app-side-window-close-corner-sample',
  templateUrl: './side-window-close-corner-sample.html',
  imports: [SideWindowContainer, Button],
})
export class SideWindowCloseCornerSample {
  readonly sideWindowRef = inject(SideWindowRef);
}
```

### Sample

```html
<app-side-window>
  <ng-container title>Hello!</ng-container>
  <ng-container content> Press ESC key or click the button below to close </ng-container>
  <ng-container actions>
    <button appButton (click)="sideWindowRef.dismiss()">Close</button>
  </ng-container>
</app-side-window>
```

```typescript
import { Component, inject } from '@angular/core';
import { Button } from '@/shared/components/button';
import { SideWindowContainer, SideWindowRef } from '@/shared/components/side-window';

@Component({
  selector: 'app-side-window-sample',
  templateUrl: './side-window-sample.html',
  imports: [SideWindowContainer, Button],
})
export class SideWindowSample {
  readonly sideWindowRef = inject(SideWindowRef);
}
```

### Trigger

```html
<button appButton (click)="open()">open side window</button>
```

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

### Trigger Close Corner

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
