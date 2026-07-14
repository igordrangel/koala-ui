import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { validateCnpj } from '@koalarx/utils/KlString';

@Component({
  selector: 'app-input-cnpj-page',
  templateUrl: './input-cnpj.page.html',
  imports: [Section, Tabs, FormField, Fieldset, Input, Mask, ValidatorHint],
})
export class InputCnpjPage {
  private readonly docs = useDocsCopy('input-cnpj');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly cnpjForm = form(signal({ cnpj: '' }), (schema) => {
    required(schema.cnpj);
    validate(schema.cnpj, ({ value }) => {
      const current = value();
      if (!current) {
        return undefined;
      }

      return validateCnpj(current) ? undefined : { kind: 'cnpjInvalid' };
    });
  });
}
