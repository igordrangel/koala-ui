import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AutocompleteBuilder } from '@koalarx/ui/shared/components/input-field/autocomplete/autocomplete-builder';
import { AutocompleteField } from '@koalarx/ui/shared/components/input-field/autocomplete/autocomplete-field';
import { AutocompleteOption } from '@koalarx/ui/shared/components/input-field/autocomplete/autocomplete-value';
import { SampleContainer } from '../sample-container/sample-container';

@Component({
  selector: 'app-autocomplete-in-memory-sample',
  templateUrl: './autocomplete-in-memory-sample.html',
  imports: [SampleContainer, AutocompleteField],
})
export class AutocompleteInMemorySample {
  form = inject(FormBuilder).group({
    personId: new FormControl<number[]>([1], Validators.required),
  });

  options = inject(AutocompleteBuilder).inMemory([
    {
      label: 'Igor',
      value: 1,
      data: { id: 1, firstName: 'Igor' },
    } as AutocompleteOption,
    {
      label: 'John',
      value: 2,
      data: { id: 2, firstName: 'John' },
    } as AutocompleteOption,
    {
      label: 'Jane',
      value: 3,
      data: { id: 3, firstName: 'Jane' },
    } as AutocompleteOption,
  ]);
}
