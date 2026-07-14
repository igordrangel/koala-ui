import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-validator-page',
  templateUrl: './validator.page.html',
  imports: [Section, Tabs, FormField, Input, ValidatorHint],
})
export class ValidatorPage {
  private readonly docs = useDocsCopy('validator');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email);
    email(schema.email);
  });
}
