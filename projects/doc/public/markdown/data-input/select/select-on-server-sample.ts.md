```typescript
import { Component, inject, resource } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  SelectBuilder,
  Select,
  SelectOption,
} from "@koalarx/ui/shared/components/input-field/select";

@Component({
  selector: "app-select-on-server-sample",
  templateUrl: "./select-on-server-sample.html",
  imports: [Select],
})
export class SelectOnServerSample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number | null>(1, Validators.required),
  });

  options = inject(SelectBuilder).onServer(
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
                } as SelectOption)
            )
          ),
    })
  );
}
```
