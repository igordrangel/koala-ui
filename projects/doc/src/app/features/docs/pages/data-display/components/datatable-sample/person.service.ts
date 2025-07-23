import { Injectable, linkedSignal, Signal } from '@angular/core';
import { HttpBase, HttpResourceRequestOptions } from '@koalarx/ui/core/base';
import { GetManyResult } from '@koalarx/ui/core/models';
import {
  Person,
  PersonFilterData,
  PersonListResult,
  QueryPerson,
} from './person.types';
import { KlArray } from '@koalarx/utils/KlArray';

@Injectable()
export class PersonService extends HttpBase<Person, any, PersonFilterData> {
  constructor() {
    super('users', 'https://dummyjson.com');
  }

  override getManyWithResource<TResponse = Person>(
    query: Signal<PersonFilterData>
  ) {
    return super.getManyWithResource(
      linkedSignal(() => {
        const params = query();
        const queryParams: QueryPerson = {
          skip: 0,
          limit: 0,
        };

        if (params.orderBy) {
          queryParams.sortBy = params.orderBy;
        }

        if (params.direction) {
          queryParams.order = params.direction;
        }

        return queryParams;
      }),
      {
        mapOption: (response: PersonListResult) => {
          const params = query();
          const pageIndex = params.page ? params.page - 1 : 0;
          const limit = params.limit || 30;
          const filteredItems = new KlArray(
            response.users.filter(
              (user) =>
                user.firstName
                  .toLowerCase()
                  .includes(params?.firstName?.toLowerCase() || '') &&
                user.lastName
                  .toLowerCase()
                  .includes(params?.lastName?.toLowerCase() || '') &&
                user.email
                  .toLowerCase()
                  .includes(params?.email?.toLowerCase() || '')
            )
          );

          return {
            count: filteredItems.length,
            items: filteredItems.split(limit)[pageIndex] || [],
          } as GetManyResult<Person>;
        },
      } as Omit<HttpResourceRequestOptions<TResponse>, 'debounceTime'>
    );
  }
}
