```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  extractTextEditorImageIds,
  TextEditor,
  TextEditorFileService,
} from '@/shared/components/text-editor';
import { FileService, FolderEnum } from './file.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.html',
  imports: [ReactiveFormsModule, TextEditor],
  providers: [{ provide: TextEditorFileService, useExisting: FileService }],
})
export class ArticleForm {
  readonly contentControl = new FormControl<string>('', { nonNullable: true });
  readonly imageFolder = FolderEnum.article;

  save() {
    const content = this.contentControl.value;

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
