import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { Tabs } from '@/shared/components/tabs';
import { Textarea } from '@/shared/components/textarea';
import { Component } from '@angular/core';

@Component({
  selector: 'app-textarea-page',
  templateUrl: './textarea.page.html',
  imports: [Section, Tabs, Textarea],
})
export class TextareaPage {
  private readonly docs = useDocsCopy('textarea');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
}
