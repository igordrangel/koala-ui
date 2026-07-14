import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Range } from '@/shared/components/range';
import { Tabs } from '@/shared/components/tabs';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-range-page',
  templateUrl: './range.page.html',
  imports: [FormField, Section, Tabs, Range],
})
export class RangePage {
  private readonly docs = useDocsCopy('range');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly rangeModel = signal({ value: 50 });
  readonly rangeForm = form(this.rangeModel);
}
