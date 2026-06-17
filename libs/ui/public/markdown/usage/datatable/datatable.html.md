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
