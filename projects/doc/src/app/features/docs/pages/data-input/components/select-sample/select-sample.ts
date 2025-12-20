import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject, resource } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  Select,
  SelectOption,
} from '@koalarx/ui/shared/components/input-field/select';
import { delay } from '@koalarx/utils/KlDelay';

@Component({
  selector: 'app-select-sample',
  templateUrl: './select-sample.html',
  imports: [SampleContainer, Select],
})
export class SelectSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number | null>(1, Validators.required),
  });

  options = resource({
    defaultValue: [],
    loader: ({ abortSignal }) =>
      fetch(`https://dummyjson.com/users`, { signal: abortSignal })
        .then((res) => delay(5000).then(() => res)) // Simulate loading delay
        .then((res) => res.json())
        .then((data: { users: { id: number; firstName: string }[] }) =>
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
