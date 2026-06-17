# Pagination

## Installation

```bash
kl install pagination
```

### HTML

```html
<app-pagination class="w-full" size="xs" [page]="1" [pageSize]="10" [total]="100" />
<app-pagination class="w-full" size="sm" [page]="1" [pageSize]="10" [total]="100" />
<app-pagination class="w-full" size="md" [page]="1" [pageSize]="10" [total]="100" />
<app-pagination class="w-full" size="lg" [page]="1" [pageSize]="10" [total]="100" />
<app-pagination class="w-full" size="xl" [page]="1" [pageSize]="10" [total]="100" />
```

```typescript
import { Pagination } from '@/shared/components/pagination';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-pagination-sample',
  templateUrl: './pagination-sample.html',
  imports: [Pagination],
})
export class PaginationSample {}
```

### TypeScript

```typescript
import { Pagination } from '@/shared/components/pagination';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-pagination-sample',
  templateUrl: './pagination-sample.html',
  imports: [Pagination],
})
export class PaginationSample {}
```
