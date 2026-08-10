import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { validateCpf } from '@koalarx/utils/KlString';

@Component({
  selector: 'app-input-cpf-sample',
  templateUrl: './input-cpf.sample.html',
  imports: [FormField, Fieldset, Input, Mask],
})
export class InputCpfSample {
  readonly cpfForm = form(signal({ cpf: '' }), (schema) => {
    required(schema.cpf, { message: 'CPF is required' });
    validate(schema.cpf, ({ value }) => {
      const current = value();
      if (!current) {
        return undefined;
      }

      return validateCpf(current)
        ? undefined
        : { kind: 'cpfInvalid', message: 'Invalid CPF' };
    });
  });
}
