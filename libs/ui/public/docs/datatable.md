# DataTable

## Installation

```bash
kl install inline-filter,table,pagination,skeleton,button,loading,list
```

### HTML

```html
<div class="flex items-center gap-1 w-full">
  <button
    appButton
    btnVariant="ghost"
    class="border-base-300 rounded-xl"
    [disabled]="datalist.isLoading()"
    (click)="datalist.reload()"
  >
    @if (!datalist.error() && datalist.isLoading()) {
      <span appLoading variant="spinner"></span>
    } @else {
      <i class="fa-solid fa-arrow-rotate-right"></i>
    }
  </button>

  <app-inline-filter class="w-full" [config]="filterConfig" (payload)="filter.set($event)" />
</div>
<app-table striped pinnedHeader class="w-full max-h-96 border border-base-200 rounded-lg">
  <ng-container header>
    <tr>
      <th class="text-xs" appTableOrderedHeaderCol="firstName" [orderBy]="orderedBy">Name</th>
      <th class="text-xs" appTableOrderedHeaderCol="email" [orderBy]="orderedBy">Email</th>
      <th class="text-xs" appTableOrderedHeaderCol="phone" [orderBy]="orderedBy">Phone</th>
      <th class="text-xs" appTableOrderedHeaderCol="gender" [orderBy]="orderedBy">Gender</th>
      <th class="text-xs" appTableOrderedHeaderCol="age" [orderBy]="orderedBy">Age</th>
      <th class="text-xs" appTableOrderedHeaderCol="eyeColor" [orderBy]="orderedBy">Eye Color</th>
    </tr>
  </ng-container>
  <ng-container body>
    @if (!datalist.isLoading() && datalist.error()) {
      <tr>
        <td class="text-center text-error" colspan="6">Failed to load data. Please try again.</td>
      </tr>
    } @else if (datalist.isLoading()) {
      @for (item of skeletonItems(); track $index) {
        <tr>
          <td appTableOrderedBodyCol="firstName" [currentOrder]="orderedBy()">
            <app-skeleton class="w-full h-4" />
          </td>
          <td appTableOrderedBodyCol="email" [currentOrder]="orderedBy()">
            <app-skeleton class="w-full h-4" />
          </td>
          <td appTableOrderedBodyCol="phone" [currentOrder]="orderedBy()">
            <app-skeleton class="w-full h-4" />
          </td>
          <td appTableOrderedBodyCol="gender" [currentOrder]="orderedBy()">
            <app-skeleton class="w-full h-4" />
          </td>
          <td appTableOrderedBodyCol="age" [currentOrder]="orderedBy()">
            <app-skeleton class="w-full h-4" />
          </td>
          <td appTableOrderedBodyCol="eyeColor" [currentOrder]="orderedBy()">
            <app-skeleton class="w-full h-4" />
          </td>
        </tr>
      }
    } @else {
      @for (item of datalist.value().items; track $index) {
        <tr>
          <td appTableOrderedBodyCol="firstName" [currentOrder]="orderedBy()">
            {{ item.firstName }} {{ item.lastName }}
          </td>
          <td appTableOrderedBodyCol="email" [currentOrder]="orderedBy()">
            {{ item.email }}
          </td>
          <td appTableOrderedBodyCol="phone" [currentOrder]="orderedBy()">
            {{ item.phone }}
          </td>
          <td appTableOrderedBodyCol="gender" [currentOrder]="orderedBy()">
            {{ item.gender }}
          </td>
          <td appTableOrderedBodyCol="age" [currentOrder]="orderedBy()">
            {{ item.age }}
          </td>
          <td appTableOrderedBodyCol="eyeColor" [currentOrder]="orderedBy()">
            {{ item.eyeColor }}
          </td>
        </tr>
      } @empty {
        <tr>
          <td class="text-center" colspan="6">No data available.</td>
        </tr>
      }
    }
  </ng-container>
  <ng-container footer>
    <tr>
      <th colspan="6">
        <app-pagination
          size="sm"
          [page]="currentPage() || 1"
          [pageSize]="pageSize() || 0"
          [total]="totalItems() || 0"
          (pageChange)="currentPage.set($event)"
          (pageSizeChange)="pageSize.set($event)"
        />
      </th>
    </tr>
  </ng-container>
</app-table>
```

```typescript
import { Component, resource } from '@angular/core';
import { Validators } from '@angular/forms';
import { KlArray } from '@koalarx/utils/KlArray';
import { ListBase } from '@/shared/base/list.base';
import { Button } from '@/shared/components/button';
import { InlineFilter, InlineFilterBuilder } from '@/shared/components/inline-filter';
import { Loading } from '@/shared/components/loading';
import { Pagination } from '@/shared/components/pagination';
import { Skeleton } from '@/shared/components/skeleton';
import { Table } from '@/shared/components/table';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  eyeColor: string;
}

interface UserFilter {
  name?: string;
  email?: string;
}

@Component({
  selector: 'app-datatable-sample',
  templateUrl: './datatable-sample.html',
  imports: [InlineFilter, Table, Pagination, Skeleton, Button, Loading],
  providers: [InlineFilterBuilder],
})
export class DatatableSample extends ListBase<User, UserFilter> {
  protected override datalist = resource({
    params: () => this.filterParams,
    defaultValue: this.defaultList,
    loader: async ({ params, abortSignal }) => {
      const page = params.page ?? 1;
      const sortBy = params.sortBy ?? 'firstName';
      const order = params.order ?? 'asc';

      const endpoint = `https://dummyjson.com/users?limit=300&sortBy=${sortBy}&order=${order}`;

      const response = await fetch(endpoint, { signal: abortSignal });
      const data: { users: User[]; total: number } = await response.json();

      const users = new KlArray<User>(
        data.users.filter((item) => {
          const nameFilter = params.filter.name;
          const emailFilter = params.filter.email;

          return (
            (!nameFilter ||
              item.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
              item.lastName.toLowerCase().includes(nameFilter.toLowerCase())) &&
            (!emailFilter || item.email.toLowerCase() === emailFilter.toLowerCase())
          );
        }),
      );

      const totalItems = users.length;
      const limitedItems = users.split(params.pageSize)[page - 1] ?? [];

      this.totalItems.set(totalItems);

      return {
        items: [...limitedItems],
        count: limitedItems.length,
      };
    },
  });

  readonly filterConfig = inject(InlineFilterBuilder)
    .input('Name', 'name')
    .input('Email', 'email', 'email')
    .build();

  constructor() {
    super();

    this.orderedBy.set({ field: 'firstName', direction: 'asc' });
  }
}
```
