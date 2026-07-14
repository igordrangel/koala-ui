import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Select, SelectOption } from '@/shared/components/select';
import { Tabs } from '@/shared/components/tabs';
import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-select-page',
  templateUrl: './select.page.html',
  imports: [FormField, JsonPipe, Section, Tabs, Select],
})
export class SelectPage {
  private readonly docs = useDocsCopy('select');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly selectModel = signal<{ single: string | null; multiple: string[] }>({
    single: null,
    multiple: [],
  });
  readonly selectForm = form(this.selectModel);

  readonly options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];
}
