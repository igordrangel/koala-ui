import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { validateCpf } from '@koalarx/utils/KlString';

@Component({
  selector: 'app-input-cpf-page',
  templateUrl: './input-cpf.page.html',
  imports: [Section, Tabs, FormField, Fieldset, Input, Mask],
})
export class InputCpfPage {
  private readonly docs = useDocsCopy('input-cpf');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

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
