# Breadcrumb

## Installation

```bash
kl install breadcrumb
```

### HTML

```html
<app-breadcrumb>
  <li>Home</li>
  <li>Documents</li>
  <li>Add Document</li>
</app-breadcrumb>
```

```typescript
import { Component } from '@angular/core';
import { Breadcrumb } from '@/shared/components/breadcrumb';

@Component({
  selector: 'app-breadcrumb-sample',
  templateUrl: './breadcrumb-sample.html',
  imports: [Breadcrumb],
})
export class BreadcrumbSample {}
```

### TypeScript

```typescript
import { Component } from '@angular/core';
import { Breadcrumb } from '@/shared/components/breadcrumb';

@Component({
  selector: 'app-breadcrumb-sample',
  templateUrl: './breadcrumb-sample.html',
  imports: [Breadcrumb],
})
export class BreadcrumbSample {}
```
