import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Radio } from '@/shared/components/radio';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-page',
  templateUrl: './radio.page.html',
  imports: [ReactiveFormsModule, Section, Tabs, Radio],
})
export class RadioPage {
  private readonly docs = useDocsCopy('radio');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  radioControl = new FormControl<string>('');
}
