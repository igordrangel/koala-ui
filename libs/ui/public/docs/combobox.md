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
  [formField]="comboboxForm.local"
/>

<app-combobox
  multiple
  placeholder="Select multiple states"
  [options]="localOptions"
  [formField]="comboboxForm.localMultiple"
/>
```

```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Combobox, ComboboxOption } from '@/shared/components/combobox';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-combobox-local-sample',
  templateUrl: './combobox-local-sample.html',
  imports: [FormField, Combobox],
})
export class ComboboxLocalSample {
  private readonly comboboxModel = signal<{ local: string | null; localMultiple: string[] }>({
    local: null,
    localMultiple: [],
  });
  readonly comboboxForm = form(this.comboboxModel);

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

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.

### Remote

```html
<app-combobox
  placeholder="Search for a user"
  [options]="asyncOptions"
  [formField]="comboboxForm.remote"
/>
```

```typescript
import { Component, Injector, resource, signal, Signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { AsyncComboboxOptions, Combobox } from '@/shared/components/combobox';
import { KlArray } from '@koalarx/utils/KlArray';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-combobox-remote-sample',
  templateUrl: './combobox-remote-sample.html',
  imports: [FormField, Combobox],
})
export class ComboboxRemoteSample {
  private readonly comboboxModel = signal<{ remote: number | null }>({ remote: 15 });
  readonly comboboxForm = form(this.comboboxModel);

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

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
