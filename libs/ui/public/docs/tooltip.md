# Tooltip

## Installation

```bash
kl install tooltip
```

### Positions

```html
<button appButton appTooltip="Top" tooltipPosition="top">Top</button>
<button appButton appTooltip="Right" tooltipPosition="right">Right</button>
<button appButton appTooltip="Bottom" tooltipPosition="bottom">Bottom</button>
<button appButton appTooltip="Left" tooltipPosition="left">Left</button>
```

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

### Variants

```html
<button appButton btnVariant="primary" appTooltip="Primary" tooltipVariant="primary">
  Primary
</button>
<button appButton btnVariant="secondary" appTooltip="Secondary" tooltipVariant="secondary">
  Secondary
</button>
<button appButton btnVariant="error" appTooltip="Error" tooltipVariant="error">Error</button>
<button appButton btnVariant="success" appTooltip="Success" tooltipVariant="success">
  Success
</button>
<button appButton btnVariant="warning" appTooltip="Warning" tooltipVariant="warning">
  Warning
</button>
<button appButton btnVariant="info" appTooltip="Info" tooltipVariant="info">Info</button>
<button appButton btnVariant="neutral" appTooltip="Neutral" tooltipVariant="neutral">
  Neutral
</button>
```

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

### TypeScript

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
