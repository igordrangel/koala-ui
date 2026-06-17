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
