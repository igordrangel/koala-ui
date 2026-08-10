import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Button } from '@/shared/components/button';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-fieldset-page',
  templateUrl: './fieldset.page.html',
  imports: [Section, Tabs, FormField, Fieldset, Input, Button],
})
export class FieldsetPage {
  private readonly docs = useDocsCopy('fieldset');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly emailForm = form(signal({ email: '' }), (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Invalid email' });
  });

  readonly loginForm = form(signal({ email: '', password: '' }), (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Invalid email' });
    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Password must be at least 8 characters' });
  });
}
