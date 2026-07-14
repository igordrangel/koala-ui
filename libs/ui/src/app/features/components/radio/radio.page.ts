import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Radio } from '@/shared/components/radio';
import { Tabs } from '@/shared/components/tabs';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-radio-page',
  templateUrl: './radio.page.html',
  imports: [FormField, Section, Tabs, Radio],
})
export class RadioPage {
  private readonly docs = useDocsCopy('radio');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly radioModel = signal({ value: '' });
  readonly radioForm = form(this.radioModel);
}
