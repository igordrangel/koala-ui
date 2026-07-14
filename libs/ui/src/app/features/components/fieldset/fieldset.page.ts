import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-fieldset-page',
  templateUrl: './fieldset.page.html',
  imports: [Section, Tabs, FormField, Fieldset, Input, ValidatorHint, Button],
})
export class FieldsetPage {
  private readonly docs = useDocsCopy('fieldset');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
  });

  readonly loginForm = form(signal({ email: '', password: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
    required(schema.password);
    minLength(schema.password, 8);
  });
}
