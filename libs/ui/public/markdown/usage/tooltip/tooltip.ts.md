```typescript
import { Component } from '@angular/core';
import { Button } from '@/shared/components/button';
import { Tooltip } from '@/shared/components/tooltip';

@Component({
  selector: 'app-tooltip-sample',
  templateUrl: './tooltip.sample.html',
  imports: [Button, Tooltip],
})
export class TooltipSample {}
```
