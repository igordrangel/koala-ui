import { SampleContainer } from '@/app/shared/components/sample-container/sample-container';
import { Component, inject, resource } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  AutocompleteBuilder,
  AutocompleteField,
  AutocompleteOption,
} from '@koalarx/ui/shared/components/input-field/autocomplete';

@Component({
  selector: 'app-autocomplete-on-server-sample',
  templateUrl: './autocomplete-on-server-sample.html',
  imports: [SampleContainer, AutocompleteField],
})
export class AutocompleteOnServerSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number | null>(1, Validators.required),
  });

  options = inject(AutocompleteBuilder).onServer(
    resource({
      defaultValue: [],
      loader: ({ abortSignal }) =>
        fetch(`https://dummyjson.com/users`, { signal: abortSignal })
          .then((res) => res.json())
          .then((data: { users: { id: number; firstName: string }[] }) =>
            data.users.map(
              (user) =>
                ({
                  label: user.firstName,
                  value: user.id,
                  data: user,
                } as AutocompleteOption)
            )
          ),
    })
  );
}
