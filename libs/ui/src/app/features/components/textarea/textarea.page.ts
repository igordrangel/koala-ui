import { Section } from '@/core/components/section';
import { Tabs } from '@/shared/components/tabs';
import { Textarea } from '@/shared/components/textarea';
import { Component } from '@angular/core';

@Component({
  selector: 'app-textarea-page',
  templateUrl: './textarea.page.html',
  imports: [Section, Tabs, Textarea],
})
export class TextareaPage {}
