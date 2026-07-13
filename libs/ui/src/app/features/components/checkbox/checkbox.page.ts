import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Checkbox } from '@/shared/components/checkbox';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox.page.html',
  imports: [ReactiveFormsModule, Section, Tabs, Checkbox],
})
export class CheckboxPage {
  private readonly docs = useDocsCopy('checkbox');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  checkboxControl = new FormControl<boolean>(true);
}
