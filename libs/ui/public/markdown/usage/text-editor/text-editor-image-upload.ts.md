```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  extractTextEditorImageIds,
  TextEditor,
  TextEditorFileService,
} from '@/shared/components/text-editor';
import { FileService, FolderEnum } from './file.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.html',
  imports: [FormField, TextEditor],
  providers: [{ provide: TextEditorFileService, useExisting: FileService }],
})
export class ArticleForm {
  private readonly editorModel = signal({ content: '' });
  readonly editorForm = form(this.editorModel);
  readonly imageFolder = FolderEnum.article;

  save() {
    const content = this.editorForm.content().value();

    // Each uploaded image is stored in the HTML as data-id on the <img> tag.
    // Temporary blob: preview URLs are already removed from the form value.
    //
    // Example content:
    // '<p>Hello</p><img data-id="file-id-from-api" class="editor-image" />'
    const assetsIds = extractTextEditorImageIds(content);
    // ['file-id-from-api']

    // POST { content, assetsIds }
  }
}
```

Reactive Forms still work via Angular 22 FormValueControl interop (`[formControl]` / `formControlName`). Prefer Signal Forms (`form()` + `[formField]`) for new code.
