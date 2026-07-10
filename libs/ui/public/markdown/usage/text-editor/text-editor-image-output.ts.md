```typescript
import { Component, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  extractTextEditorImageIds,
  TextEditor,
} from '@/shared/components/text-editor';

@Component({
  selector: 'app-article-form',
  template: `
    <app-text-editor #editor class="w-full" [formControl]="contentControl" />

    <p>Attached image IDs: {{ editor().attachedImageIds() | json }}</p>
  `,
  imports: [ReactiveFormsModule, TextEditor],
})
export class ArticleForm {
  readonly editor = viewChild.required(TextEditor);
  readonly contentControl = new FormControl<string>('', { nonNullable: true });

  save() {
    const content = this.contentControl.value;

    // Option 1: parse data-id attributes from the HTML string
    const assetsIds = extractTextEditorImageIds(content);

    // Option 2: read the live signal from the editor (same ids, updated on every change)
    // const assetsIds = this.editor().attachedImageIds();

    // POST { content, assetsIds }
  }
}
```
