import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject, resource } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  AutocompleteBuilder,
  AutocompleteField,
  AutocompleteOption,
} from '@koalarx/ui/shared/components/input-field/autocomplete';

@Component({
  selector: 'app-autocomplete-on-demand-sample',
  templateUrl: './autocomplete-on-demand-sample.html',
  imports: [SampleContainer, AutocompleteField],
})
export class AutocompleteOnDemandSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number | null>(1, Validators.required),
  });

  options = inject(AutocompleteBuilder).onDemand((params) =>
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
                  } as AutocompleteOption)
              )
              .filter(
                (option) =>
                  (params.autofill && option.value === params.autofill) ||
                  (params.filter &&
                    option.label
                      .toLowerCase()
                      .includes(params.filter.toLowerCase())) ||
                  (!params.autofill && !params.filter)
              )
          ),
    })
  );
}
