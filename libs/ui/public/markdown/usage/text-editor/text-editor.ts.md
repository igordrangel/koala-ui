```typescript
import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { extractTextEditorImageIds, TextEditor } from '@/shared/components/text-editor';

@Component({
  selector: 'app-text-editor-sample',
  templateUrl: './text-editor-sample.html',
  imports: [FormField, TextEditor],
})
export class TextEditorSample {
  private readonly editorModel = signal({ content: '<p>Hello world</p>' });
  readonly editorForm = form(this.editorModel);
  readonly editorImageIds = computed(() =>
    extractTextEditorImageIds(this.editorForm.content().value()),
  );

  save() {
    const content = this.editorForm.content().value();

    // Each image is stored as data-id on the <img> tag in the HTML.
    // Example: '<p>Hello</p><img data-id="file-id-from-api" class="editor-image" />'
    const assetsIds = extractTextEditorImageIds(content);
    // ['file-id-from-api']

    // POST { content, assetsIds }
  }
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
