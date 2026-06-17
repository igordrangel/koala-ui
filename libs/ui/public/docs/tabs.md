# Tabs

## Installation

```bash
kl install -n tabs
```

### HTML

```html
<div appTabGroup align="start" class="flex items-center w-full">
  <div appTab label="Tab 1" checked>
    <div class="flex items-center gap-2 p-5 border border-t-0 border-base-300 rounded-b-lg">
      Tab content 1
    </div>
  </div>
  <div appTab label="Tab 2">
    <div class="flex items-center gap-2 p-5 border border-t-0 border-base-300 rounded-b-lg">
      Tab content 2
    </div>
  </div>
  <div appTab label="Tab 3">
    <div class="flex items-center gap-2 p-5 border border-t-0 border-base-300 rounded-b-lg">
      Tab content 3
    </div>
  </div>
</div>
```

```typescript
import { Component } from '@angular/core';
import { Tabs } from '@/shared/components/tabs';

@Component({
  selector: 'app-tabs-sample',
  templateUrl: './tabs.sample.html',
  imports: [Tabs],
})
export class TabsSample {}
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { Tabs } from '@/shared/components/tabs';

@Component({
  selector: 'app-tabs-sample',
  templateUrl: './tabs.sample.html',
  imports: [Tabs],
})
export class TabsSample {}
```
