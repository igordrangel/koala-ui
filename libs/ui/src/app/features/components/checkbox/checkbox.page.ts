import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Checkbox } from '@/shared/components/checkbox';
import { Tabs } from '@/shared/components/tabs';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox.page.html',
  imports: [FormField, Section, Tabs, Checkbox],
})
export class CheckboxPage {
  private readonly docs = useDocsCopy('checkbox');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly checkboxModel = signal({ checked: true });
  readonly checkboxForm = form(this.checkboxModel);
}
