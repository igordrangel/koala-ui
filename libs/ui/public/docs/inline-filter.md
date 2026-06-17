# Inline Filter

## Installation

```bash
kl install inline-filter
```

### HTML

```html
<app-inline-filter [config]="inlineFilterConfig" (payload)="appliedFilters.set($event)" />
```

```typescript
import { InlineFilter, InlineFilterBuilder } from '@/shared/components/inline-filter';
import { Component, inject, Injector, resource, signal, Signal } from '@angular/core';
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

@Component({
  selector: 'app-filter-sample',
  templateUrl: './filter-sample.html',
  imports: [InlineFilter],
  providers: [InlineFilterBuilder],
})
export class InlineFilterSample {
  private readonly usersResourceFactory = (
    filter: Signal<string>,
    values: Signal<number[]>,
    injector: Injector,
  ) =>
    resource({
      injector,
      params: () => ({
        selectedValues: values(),
        filter: filter?.() ?? '',
      }),
      defaultValue: [],
      loader: async ({ params, abortSignal }) => {
        const sortBy = 'firstName';
        const order = 'asc';
        const selectedIds = params.selectedValues;

        const endpoint = `https://dummyjson.com/users?limit=300&sortBy=${sortBy}&order=${order}`;

        const response = await fetch(endpoint, { signal: abortSignal });
        const data: { users: User[]; total: number } = await response.json();

        const users =
          new KlArray<User>([
            ...data.users.filter((item) => selectedIds.includes(item.id)),
            ...data.users.filter((item) => !selectedIds.includes(item.id)),
          ])
            .orderBy('firstName', 'asc')
            .split(30)[0] ?? [];

        return users.map((user) => ({
          value: user.id,
          label: `${user.firstName} ${user.lastName}`,
          data: user,
        }));
      },
    });

  readonly appliedFilters = signal<Record<string, any>>({});

  readonly inlineFilterConfig = inject(InlineFilterBuilder)
    .input('Author', 'author', 'text', { placeholder: 'e.g. John' })
    .input('CPF', 'cpf', 'cpf')
    .input('CNPJ', 'cnpj', 'cnpj')
    .select(
      'Status',
      'status',
      [
        { value: 'open', label: 'Open' },
        { value: 'closed', label: 'Closed' },
        { value: 'draft', label: 'Draft' },
      ] as const,
      { defaultValue: 'open' },
    )
    .select(
      'Labels',
      'labels',
      [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'docs', label: 'Documentation' },
        { value: 'design-system', label: 'Design System' },
      ] as const,
      { multiple: true },
    )
    .select('Type', 'type', [
      { value: 'feat', label: 'Feature' },
      { value: 'fix', label: 'Fix' },
      { value: 'docs', label: 'Docs' },
      { value: 'refactor', label: 'Refactor' },
    ] as const)
    .combobox('Assignee', 'assignee', this.usersResourceFactory, {})
    .calendar('Created after', 'createdAfter')
    .input('Min comments', 'minComments', 'number', { placeholder: '0' })
    .input('Contact e-mail', 'contactEmail', 'email')
    .input('Price', 'price', 'currency')
    .build();
}
```

### TypeScript

```typescript
import { InlineFilter, InlineFilterBuilder } from '@/shared/components/inline-filter';
import { Component, inject, Injector, resource, signal, Signal } from '@angular/core';
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

@Component({
  selector: 'app-filter-sample',
  templateUrl: './filter-sample.html',
  imports: [InlineFilter],
  providers: [InlineFilterBuilder],
})
export class InlineFilterSample {
  private readonly usersResourceFactory = (
    filter: Signal<string>,
    values: Signal<number[]>,
    injector: Injector,
  ) =>
    resource({
      injector,
      params: () => ({
        selectedValues: values(),
        filter: filter?.() ?? '',
      }),
      defaultValue: [],
      loader: async ({ params, abortSignal }) => {
        const sortBy = 'firstName';
        const order = 'asc';
        const selectedIds = params.selectedValues;

        const endpoint = `https://dummyjson.com/users?limit=300&sortBy=${sortBy}&order=${order}`;

        const response = await fetch(endpoint, { signal: abortSignal });
        const data: { users: User[]; total: number } = await response.json();

        const users =
          new KlArray<User>([
            ...data.users.filter((item) => selectedIds.includes(item.id)),
            ...data.users.filter((item) => !selectedIds.includes(item.id)),
          ])
            .orderBy('firstName', 'asc')
            .split(30)[0] ?? [];

        return users.map((user) => ({
          value: user.id,
          label: `${user.firstName} ${user.lastName}`,
          data: user,
        }));
      },
    });

  readonly appliedFilters = signal<Record<string, any>>({});

  readonly inlineFilterConfig = inject(InlineFilterBuilder)
    .input('Author', 'author', 'text', { placeholder: 'e.g. John' })
    .input('CPF', 'cpf', 'cpf')
    .input('CNPJ', 'cnpj', 'cnpj')
    .select(
      'Status',
      'status',
      [
        { value: 'open', label: 'Open' },
        { value: 'closed', label: 'Closed' },
        { value: 'draft', label: 'Draft' },
      ] as const,
      { defaultValue: 'open' },
    )
    .select(
      'Labels',
      'labels',
      [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'docs', label: 'Documentation' },
        { value: 'design-system', label: 'Design System' },
      ] as const,
      { multiple: true },
    )
    .select('Type', 'type', [
      { value: 'feat', label: 'Feature' },
      { value: 'fix', label: 'Fix' },
      { value: 'docs', label: 'Docs' },
      { value: 'refactor', label: 'Refactor' },
    ] as const)
    .combobox('Assignee', 'assignee', this.usersResourceFactory, {})
    .calendar('Created after', 'createdAfter')
    .input('Min comments', 'minComments', 'number', { placeholder: '0' })
    .input('Contact e-mail', 'contactEmail', 'email')
    .input('Price', 'price', 'currency')
    .build();
}
```
