import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component } from '@angular/core';
import { ListBase } from '@koalarx/ui/core/base';
import {
  Datatable,
  SortedItem,
  SortHeaderColumn,
} from '@koalarx/ui/shared/components/datatable';
import { Button, Tooltip } from '@koalarx/ui/shared/directives';
import { PersonFilter } from './person-filter';
import { PersonService } from './person.service';
import { Person, PersonFilterData } from './person.types';

@Component({
  selector: 'app-datatable-sample',
  templateUrl: './datatable-sample.html',
  providers: [PersonService],
  imports: [
    SampleContainer,
    Datatable,
    SortHeaderColumn,
    SortedItem,
    Button,
    Tooltip,
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
