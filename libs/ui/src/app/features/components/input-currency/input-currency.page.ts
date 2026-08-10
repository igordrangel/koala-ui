import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { CurrencyMask } from '@/shared/directives/currency.directive';
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-input-currency-page',
  templateUrl: './input-currency.page.html',
  imports: [Section, Tabs, FormField, Fieldset, Input, CurrencyMask],
})
export class InputCurrencyPage {
  private readonly docs = useDocsCopy('input-currency');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly currencyForm = form(signal({ currency: 0 as number | null }), (schema) => {
    required(schema.currency, { message: 'Currency is required' });
  });
}
