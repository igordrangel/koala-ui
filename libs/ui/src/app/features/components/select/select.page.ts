import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Select, SelectOption } from '@/shared/components/select';
import { Tabs } from '@/shared/components/tabs';
import { controlChanges } from '@/shared/utils/control-changes';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-page',
  templateUrl: './select.page.html',
  imports: [ReactiveFormsModule, JsonPipe, Section, Tabs, Select],
})
export class SelectPage {
  private readonly docs = useDocsCopy('select');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly singleControl = new FormControl<string | null>(null);
  readonly multipleControl = new FormControl<string[]>([], { nonNullable: true });

  readonly singleValueChanges = controlChanges(this.singleControl);
  readonly multipleValueChanges = controlChanges(this.multipleControl);

  readonly options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
}
