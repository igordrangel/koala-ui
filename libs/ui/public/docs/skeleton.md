# Skeleton

## Installation

```bash
kl install skeleton
```

### Circle

```html
<app-skeleton class="w-32 h-32" variant="circle" />
```

```typescript
import { Component } from '@angular/core';
import { Skeleton } from '@/shared/components/skeleton';

@Component({
  selector: 'app-tabs-sample',
  templateUrl: './tabs.sample.html',
  imports: [Skeleton],
})
export class SkeletonSample {}
```

### Composition

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
import { Skeleton } from '@/shared/components/skeleton';

@Component({
  selector: 'app-tabs-sample',
  templateUrl: './tabs.sample.html',
  imports: [Skeleton],
})
export class SkeletonSample {}
```

### Rect

```html
<app-skeleton class="w-32 h-32" variant="rect" />
```

```typescript
import { Component } from '@angular/core';
import { Skeleton } from '@/shared/components/skeleton';

@Component({
  selector: 'app-tabs-sample',
  templateUrl: './tabs.sample.html',
  imports: [Skeleton],
})
export class SkeletonSample {}
```

### Text

```html
<app-skeleton variant="text">AI is thinking harder...</app-skeleton>
```

```typescript
import { Component } from '@angular/core';
import { Skeleton } from '@/shared/components/skeleton';

@Component({
  selector: 'app-tabs-sample',
  templateUrl: './tabs.sample.html',
  imports: [Skeleton],
})
export class SkeletonSample {}
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { Skeleton } from '@/shared/components/skeleton';

@Component({
  selector: 'app-tabs-sample',
  templateUrl: './tabs.sample.html',
  imports: [Skeleton],
})
export class SkeletonSample {}
```
