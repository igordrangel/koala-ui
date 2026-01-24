import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject, resource } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  Select,
  SelectBuilder,
  SelectOption,
} from '@koalarx/ui/shared/components/input-field/select';

@Component({
  selector: 'app-select-on-demand-sample',
  templateUrl: './select-on-demand-sample.html',
  imports: [SampleContainer, Select],
})
export class SelectOnDemandSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number | null>(1, Validators.required),
  });

  options = inject(SelectBuilder).onDemand((params) =>
    resource({
      defaultValue: [],
      params: () => params(),
      loader: ({ params, abortSignal }) =>
        fetch(`https://dummyjson.com/users`, { signal: abortSignal })
          .then((res) => res.json())
          .then((data: { users: { id: number; firstName: string }[] }) =>
            data.users
              .map(
                (user) =>
                  ({
                    label: user.firstName,
                    value: user.id,
                    data: user,
                  }) as SelectOption,
              )
              .filter(
                (option) =>
                  (params.currentValue &&
                    option.value === params.currentValue) ||
                  (params.filter &&
                    option.label
                      .toLowerCase()
                      .includes(params.filter.toLowerCase())) ||
                  (!params.currentValue && !params.filter),
              ),
          ),
    }),
  );
}
