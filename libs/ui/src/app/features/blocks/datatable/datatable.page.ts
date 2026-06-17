import { Section } from '@/core/components/section';
import { ListBase } from '@/shared/base/list.base';
import { Button } from '@/shared/components/button';
import { InlineFilter, InlineFilterBuilder } from '@/shared/components/inline-filter';
import { Loading } from '@/shared/components/loading';
import { Pagination } from '@/shared/components/pagination';
import { Skeleton } from '@/shared/components/skeleton';
import { Table } from '@/shared/components/table';
import { Tabs } from '@/shared/components/tabs';
import { Component, inject, resource } from '@angular/core';
import { KlArray } from '@koalarx/utils/KlArray';

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
  selector: 'app-datatable',
  templateUrl: './datatable.page.html',
  imports: [Section, Tabs, InlineFilter, Table, Pagination, Skeleton, Button, Loading],
  providers: [InlineFilterBuilder],
})
export class DatatablePage extends ListBase<User, UserFilter> {
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
