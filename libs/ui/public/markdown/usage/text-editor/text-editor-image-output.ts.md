```typescript
import { Component, signal, viewChild } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  extractTextEditorImageIds,
  TextEditor,
} from '@/shared/components/text-editor';

@Component({
  selector: 'app-article-form',
  template: `
    <app-text-editor #editor class="w-full" [formField]="editorForm.content" />

    <p>Attached image IDs: {{ editor().attachedImageIds() | json }}</p>
  `,
  imports: [FormField, TextEditor],
})
export class ArticleForm {
  readonly editor = viewChild.required(TextEditor);
  private readonly editorModel = signal({ content: '' });
  readonly editorForm = form(this.editorModel);

  save() {
    const content = this.editorForm.content().value();

    // Option 1: parse data-id attributes from the HTML string
    const assetsIds = extractTextEditorImageIds(content);

    // Option 2: read the live signal from the editor (same ids, updated on every change)
    // const assetsIds = this.editor().attachedImageIds();

    // POST { content, assetsIds }
  }
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
