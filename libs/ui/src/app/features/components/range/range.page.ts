import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Range } from '@/shared/components/range';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-range-page',
  templateUrl: './range.page.html',
  imports: [ReactiveFormsModule, Section, Tabs, Range],
})
export class RangePage {
  private readonly docs = useDocsCopy('range');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  rangeControl = new FormControl<number>(50);
}
