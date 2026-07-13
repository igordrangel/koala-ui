import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Input } from '@/shared/components/input-field';
import { Tabs } from '@/shared/components/tabs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-field-page',
  templateUrl: './input-field.page.html',
  imports: [Section, Tabs, Input],
})
export class InputFieldPage {
  private readonly docs = useDocsCopy('input-field');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
