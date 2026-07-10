# Combobox

## Installation

```bash
kl install combobox
```

### Local

```html
<app-combobox
  placeholder="Select a state"
  [options]="localOptions"
  [formControl]="localComboboxControl"
/>

<app-combobox
  multiple
  placeholder="Select multiple states"
  [options]="localOptions"
  [formControl]="localMultipleComboboxControl"
/>
```

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Combobox, ComboboxOption } from '@/shared/components/combobox';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-combobox-local-sample',
  templateUrl: './combobox-local-sample.html',
  imports: [ReactiveFormsModule, Combobox],
})
export class ComboboxLocalSample {
  readonly localComboboxControl = new FormControl<string | null>(null);
  readonly localMultipleComboboxControl = new FormControl<string[]>([], { nonNullable: true });

  readonly localOptions: ComboboxOption<string>[] = new KlArray([
    { value: 'sp', label: 'Sao Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'ba', label: 'Bahia' },
    { value: 'pr', label: 'Parana' },
    { value: 'sc', label: 'Santa Catarina' },
    { value: 'rs', label: 'Rio Grande do Sul' },
    { value: 'pe', label: 'Pernambuco' },
  ]).orderBy('label', 'asc');
}
```

### Remote

```html
<app-combobox
  placeholder="Search for a user"
  [options]="asyncOptions"
  [formControl]="remoteComboboxControl"
/>
```

```typescript
import { Component, Injector, resource, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Combobox, ComboboxOption, ComboboxResourceFactory } from '@/shared/components/combobox';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-combobox-remote-sample',
  templateUrl: './combobox-remote-sample.html',
  imports: [ReactiveFormsModule, Combobox],
})
export class ComboboxRemoteSample {
  readonly remoteComboboxControl = new FormControl<number | null>(15);

  readonly asyncOptions: AsyncComboboxOptions<number, User> = (
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

        const users = new KlArray<User>(
          new KlArray([
            ...data.users.filter((item) => selectedIds.includes(item.id)),
            ...data.users.filter(
              (item) =>
                !selectedIds.includes(item.id) &&
                (item.firstName.toLowerCase().includes(params.filter.toLowerCase()) ||
                  item.lastName.toLowerCase().includes(params.filter.toLowerCase())),
            ),
          ]).split(30)[0],
        ).orderBy('firstName', 'asc');

        return [
          ...users.map((user) => ({
            value: user.id,
            label: `${user.firstName} ${user.lastName}`,
            data: user,
          })),
        ];
      },
    });
}
```
