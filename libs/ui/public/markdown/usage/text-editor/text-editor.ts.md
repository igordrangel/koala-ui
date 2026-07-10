```typescript
import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { extractTextEditorImageIds, TextEditor } from '@/shared/components/text-editor';
import { controlChanges } from '@/shared/utils/control-changes';

@Component({
  selector: 'app-text-editor-sample',
  templateUrl: './text-editor-sample.html',
  imports: [ReactiveFormsModule, TextEditor],
})
export class TextEditorSample {
  readonly editorControl = new FormControl<string>('<p>Hello world</p>', { nonNullable: true });
  readonly editorValue = controlChanges(this.editorControl);
  readonly editorImageIds = computed(() => extractTextEditorImageIds(this.editorValue()));

  save() {
    const content = this.editorControl.value;

    // Each image is stored as data-id on the <img> tag in the HTML.
    // Example: '<p>Hello</p><img data-id="file-id-from-api" class="editor-image" />'
    const assetsIds = extractTextEditorImageIds(content);
    // ['file-id-from-api']

    // POST { content, assetsIds }
  }
}
```
