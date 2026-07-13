import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { InputColor } from '@/shared/components/input-color';
import { Tabs } from '@/shared/components/tabs';
import { controlChanges } from '@/shared/utils/control-changes';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-color-page',
  templateUrl: './input-color.page.html',
  imports: [ReactiveFormsModule, JsonPipe, Section, Tabs, InputColor],
})
export class InputColorPage {
  private readonly docs = useDocsCopy('input-color');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly colorControl = new FormControl<string | null>(null);
  readonly inlineColorControl = new FormControl<string | null>('color-blue-500');

  readonly colorValue = controlChanges(this.colorControl);
  readonly inlineColorValue = controlChanges(this.inlineColorControl);
}
