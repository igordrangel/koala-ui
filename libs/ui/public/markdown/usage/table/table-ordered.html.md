```html
<app-table class="w-full">
  <ng-container header>
    <tr>
      <th appTableOrderedHeaderCol="name" [orderBy]="orderedBy">Name</th>
      <th appTableOrderedHeaderCol="job" [orderBy]="orderedBy">Job</th>
      <th appTableOrderedHeaderCol="favoriteColor" [orderBy]="orderedBy">Favorite Color</th>
    </tr>
  </ng-container>
  <ng-container body>
    @for (item of orderedTableData(); track $index) {
      <tr>
        <td appTableOrderedBodyCol="name" [currentOrder]="orderedBy()">
          {{ item.name }}
        </td>
        <td appTableOrderedBodyCol="job" [currentOrder]="orderedBy()">{{ item.job }}</td>
        <td appTableOrderedBodyCol="favoriteColor" [currentOrder]="orderedBy()">
          {{ item.favoriteColor }}
        </td>
      </tr>
    }
  </ng-container>
</app-table>
```
