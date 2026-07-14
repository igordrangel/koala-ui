import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Toggle } from '@/shared/components/toggle';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-toggle-page',
  templateUrl: './toggle.page.html',
  imports: [FormField, Section, Tabs, Toggle],
})
export class TogglePage {
  private readonly docs = useDocsCopy('toggle');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly toggleModel = signal({ checked: true });
  readonly toggleForm = form(this.toggleModel);
}
