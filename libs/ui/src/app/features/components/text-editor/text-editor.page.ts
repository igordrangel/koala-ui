import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { extractTextEditorImageIds, TextEditor } from '@/shared/components/text-editor';
import { Tabs } from '@/shared/components/tabs';
import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-text-editor-page',
  templateUrl: './text-editor.page.html',
  imports: [FormField, Section, Tabs, TextEditor, JsonPipe],
})
export class TextEditorPage {
  private readonly docs = useDocsCopy('text-editor');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly editorModel = signal({ content: '<p>Hello world</p>' });
  readonly editorForm = form(this.editorModel);
  readonly editorImageIds = computed(() =>
    extractTextEditorImageIds(this.editorForm.content().value()),
  );
}
