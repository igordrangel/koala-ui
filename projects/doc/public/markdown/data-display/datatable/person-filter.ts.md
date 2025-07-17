```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  FilterData,
  FilterFactory,
} from '@koalarx/ui/shared/components/datatable';
import { FieldGroup } from '@koalarx/ui/shared/components/input-field/field-group';
import { InputEmail } from '@koalarx/ui/shared/components/input-field/input-email';
import { InputText } from '@koalarx/ui/shared/components/input-field/input-text';
import {
  SIDE_WINDOW_DATA,
  SideWindowContent,
  SideWindowRef,
} from '@koalarx/ui/shared/components/side-window';
import { Button } from '@koalarx/ui/shared/directives';

@Component({
  selector: 'app-person-filter',
  templateUrl: './person-filter.html',
  providers: [FilterFactory],
  imports: [
    ReactiveFormsModule,
    SideWindowContent,
    FieldGroup,
    InputText,
    InputEmail,
    Button,
  ],
})
export class PersonFilter implements OnInit {
  private readonly sideWindowRef = inject(SideWindowRef);
  private readonly filterFactory = inject(FilterFactory);
  private readonly data = inject<FilterData[]>(SIDE_WINDOW_DATA);

  sendingData = signal(false);
  form = inject(FormBuilder).group({
    firstName: new FormControl<string | null>(null),
    lastName: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    if (this.data) {
      const payload = this.filterFactory.toPayload(this.data);
      this.form.patchValue(payload);
    }
  }

  sendFilter() {
    const filters = this.filterFactory.setFilters(
      this.form.getRawValue(),
      (propName, value) => {
        switch (propName) {
          case 'firstName':
            return `First Name = ${value}`;
          case 'lastName':
            return `Last Name = ${value}`;
          case 'email':
            return `Email = ${value}`;
          default: {
            return `${propName}: ${value}`;
          }
        }
      }
    );

    this.sideWindowRef.dismiss(filters);
  }

  close() {
    this.sideWindowRef.dismiss();
  }
}
```
