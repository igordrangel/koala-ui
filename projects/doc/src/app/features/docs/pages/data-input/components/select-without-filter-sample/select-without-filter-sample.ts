import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject, resource } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Select } from '@koalarx/ui/shared/components/input-field/select';
import { SelectOption } from '@koalarx/ui/shared/components/input-field/select/select.type';
import { delay } from '@koalarx/utils/KlDelay';

interface User {
  id: number;
  firstName: string;
}

@Component({
  selector: 'app-select-without-filter-sample',
  templateUrl: './select-without-filter-sample.html',
  imports: [SampleContainer, Select],
})
export class SelectWithoutFilterSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number | null>(1, Validators.required),
  });

  options = resource({
    defaultValue: [],
    loader: ({ abortSignal }) =>
      fetch(`https://dummyjson.com/users`, { signal: abortSignal })
        .then((res) => delay(2000).then(() => res)) // Simulate loading delay
        .then((res) => res.json())
        .then((data: { users: User[] }) =>
          data.users.map(
            (user) =>
              ({
                label: user.firstName,
                value: user.id,
                data: user,
              } as SelectOption)
          )
        ),
  });
}
