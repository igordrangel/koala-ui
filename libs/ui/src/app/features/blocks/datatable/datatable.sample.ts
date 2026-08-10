import { ListBase } from '@/shared/base/list.base';
import { Button } from '@/shared/components/button';
import { InlineFilter, InlineFilterBuilder } from '@/shared/components/inline-filter';
import { Loading } from '@/shared/components/loading';
import { Pagination } from '@/shared/components/pagination';
import { Skeleton } from '@/shared/components/skeleton';
import { Table } from '@/shared/components/table';
import { Component, inject } from '@angular/core';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-datatable-sample',
  templateUrl: './datatable.sample.html',
  imports: [InlineFilter, Table, Pagination, Skeleton, Button, Loading],
  providers: [InlineFilterBuilder],
})
export class DatatableSample extends ListBase<User, UsersService> {
  readonly filterConfig = inject(InlineFilterBuilder)
    .input('Name', 'name')
    .input('Email', 'email', 'email')
    .build();

  constructor() {
    super(UsersService);

    this.orderedBy.set({ field: 'firstName', direction: 'asc' });
  }
}
