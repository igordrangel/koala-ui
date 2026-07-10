import { Section } from '@/core/components/section';
import { AsyncComboboxOptions, Combobox, ComboboxOption } from '@/shared/components/combobox';
import { Tabs } from '@/shared/components/tabs';
import { Component, Injector, resource, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-combobox-page',
  templateUrl: './combobox.page.html',
  imports: [ReactiveFormsModule, Section, Tabs, Combobox],
})
export class ComboboxPage {
  readonly localComboboxControl = new FormControl<string | null>('');
  readonly localMultipleComboboxControl = new FormControl<string[]>([], { nonNullable: true });
  readonly remoteComboboxControl = new FormControl<number | null>(15);

  readonly localComboboxChanges = toSignal(this.localComboboxControl.valueChanges, {
    initialValue: this.localComboboxControl.value,
  });
  readonly localMultipleComboboxChanges = toSignal(this.localMultipleComboboxControl.valueChanges, {
    initialValue: this.localMultipleComboboxControl.value,
  });
  readonly remoteComboboxChanges = toSignal(this.remoteComboboxControl.valueChanges, {
    initialValue: this.remoteComboboxControl.value,
  });

  readonly localOptions = new KlArray<ComboboxOption<string>>([
    { value: 'sp', label: 'Sao Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'ba', label: 'Bahia' },
    { value: 'pr', label: 'Parana' },
    { value: 'sc', label: 'Santa Catarina' },
    { value: 'rs', label: 'Rio Grande do Sul' },
    { value: 'pe', label: 'Pernambuco' },
  ]).orderBy('label', 'asc');

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
