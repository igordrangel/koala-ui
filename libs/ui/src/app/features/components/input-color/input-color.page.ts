import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { InputColor } from '@/shared/components/input-color';
import { Tabs } from '@/shared/components/tabs';
import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-input-color-page',
  templateUrl: './input-color.page.html',
  imports: [FormField, JsonPipe, Section, Tabs, InputColor],
})
export class InputColorPage {
  private readonly docs = useDocsCopy('input-color');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly colorModel = signal<{ color: string | null; inline: string | null }>({
    color: null,
    inline: 'color-blue-500',
  });
  readonly colorForm = form(this.colorModel);
}
