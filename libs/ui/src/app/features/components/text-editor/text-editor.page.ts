import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { extractTextEditorImageIds, TextEditor } from '@/shared/components/text-editor';
import { Tabs } from '@/shared/components/tabs';
import { controlChanges } from '@/shared/utils/control-changes';
import { JsonPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor-page',
  templateUrl: './text-editor.page.html',
  imports: [ReactiveFormsModule, Section, Tabs, TextEditor, JsonPipe],
})
export class TextEditorPage {
  private readonly docs = useDocsCopy('text-editor');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  readonly editorControl = new FormControl<string>('<p>Hello world</p>', { nonNullable: true });
  readonly editorValue = controlChanges(this.editorControl);
  readonly editorImageIds = computed(() => extractTextEditorImageIds(this.editorValue()));
}
