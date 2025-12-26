```typescript
import { Component, inject, resource } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  SelectBuilder,
  Select,
  SelectOption,
} from "@koalarx/ui/shared/components/input-field/select";

@Component({
  selector: "app-select-on-demand-sample",
  templateUrl: "./select-on-demand-sample.html",
  imports: [Select],
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
                  } as SelectOption)
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
```
