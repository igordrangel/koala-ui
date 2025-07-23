```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListBase } from '@koalarx/ui/core/base';
import {
  Datatable,
  SortedItem,
  SortHeaderColumn,
} from '@koalarx/ui/shared/components/datatable';
import { PersonFilter } from './person-filter';
import { PersonService } from './person.service';
import { Person, PersonFilterData } from './person.types';

@Component({
  selector: 'app-datatable-sample',
  templateUrl: './datatable-sample.html',
  providers: [PersonService],
  imports: [
    Datatable,
    SortHeaderColumn,
    SortedItem,
    FormsModule,
  ],
})
export class DatatableSample extends ListBase<PersonFilterData, Person> {
  constructor() {
    super(PersonService, PersonFilter);

    this.sortFilter.set({
      orderBy: 'firstName',
      direction: 'asc',
    });
  }
}
```
