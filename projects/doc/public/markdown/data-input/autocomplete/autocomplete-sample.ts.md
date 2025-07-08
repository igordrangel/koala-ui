```typescript
import { Component, inject, resource } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AutocompleteField } from "@koalarx/ui/shared/components/input-field/autocomplete/autocomplete-field";
import { AutocompleteOption } from "@koalarx/ui/shared/components/input-field/autocomplete/autocomplete-value";

@Component({
  selector: "app-autocomplete-sample",
  templateUrl: "./autocomplete-sample.html",
  imports: [AutocompleteField],
})
export class AutocompleteSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number | null>(null, Validators.required),
  });

  options = resource({
    defaultValue: [],
    loader: () =>
      fetch(`https://dummyjson.com/users`)
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
  });
}
```
