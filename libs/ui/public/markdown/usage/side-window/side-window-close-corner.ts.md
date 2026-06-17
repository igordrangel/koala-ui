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
