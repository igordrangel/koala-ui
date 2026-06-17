```typescript
import { Component, effect, signal } from '@angular/core';
import { OrderBy, Table } from '@/shared/components/table';
import { KlArray } from '@koalarx/utils/KlArray';

interface OrderedTableData {
  name: string;
  job: string;
  favoriteColor: string;
}

@Component({
  selector: 'app-table-ordered-sample',
  templateUrl: './table-ordered-sample.html',
  imports: [Table],
})
export class TableOrderedSample {
  readonly orderedBy = signal<OrderBy | null>(null);
  readonly orderedTableData = signal<KlArray<OrderedTableData>>(
    new KlArray<OrderedTableData>([
      { name: 'John Doe', job: 'Software Engineer', favoriteColor: 'Blue' },
      { name: 'Cy Ganderton', job: 'Quality Control Specialist', favoriteColor: 'Purple' },
      { name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    ]),
  );

  constructor() {
    effect(() => {
      const orderBy = this.orderedBy();

      if (orderBy) {
        this.orderedTableData.update((data) => {
          return data.orderBy(orderBy.field, orderBy.direction);
        });
      }
    });
  }
}
```
