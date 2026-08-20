# Text Editor

## Installation

```bash
kl install text-editor
```

For API image upload, also install HttpBase:

```bash
kl install http-base
```

### HTML

```html
<app-text-editor class="w-full" [formField]="editorForm.content" />

<pre>{{ editorForm.content().value() }}</pre>
<pre>{{ editorImageIds() | json }}</pre>
```

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

### Image Output

```html
<app-text-editor #editor class="w-full" [formField]="editorForm.content" />
```

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

### Image Upload

```html
<app-text-editor class="w-full" [formField]="editorForm.content" [imageFolder]="imageFolder" />
```

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

### File Service

```typescript
import { HttpResponse } from '@angular/common/http';
import { Service } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpBase } from '@/shared/base/http.base';
import { TextEditorFileData, TextEditorFileService } from '@/shared/components/text-editor';
import { environment } from '@/environments/environment';

export enum FolderEnum {
  article = 1,
}

@Service()
export class FileService extends HttpBase implements TextEditorFileService {
  constructor() {
    super(environment.apiUrl, 'file');
  }

  private toFileData(fileId: string, response: HttpResponse<Blob>): TextEditorFileData {
    const type = response.headers.get('Content-Type') || '';
    const blob = new Blob([response.body as BlobPart], { type });
    const name =
      response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') ||
      'unknown';

    return {
      id: fileId,
      type,
      name,
      url: URL.createObjectURL(blob),
    };
  }

  upload(folder: number, files: File[]): Observable<string[]> {
    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file, file.name);
    }

    formData.append('folder', folder.toString());

    return this.post(formData).pipe(map((response) => (response as { ids: string[] }).ids));
  }

  download(fileId: string): Observable<TextEditorFileData | null> {
    return this.http
      .get(this.url(fileId), { observe: 'response', responseType: 'blob' })
      .pipe(
        map((response) => this.toFileData(fileId, response)),
        catchError(() => of(null)),
      );
  }
}
```

### Overview

Image insertion (toolbar button, drag & drop, and paste) is handled internally by the text editor. Your app only implements `TextEditorFileService` with `upload()` and `download()`.

By default, the editor uses `Base64TextEditorFileService`, which embeds images as base64 `data:` URLs.

## Building a custom FileService

Install HttpBase and implement `TextEditorFileService` (see [Http Base](./http-base.md)):

```bash
kl install http-base
```

### 1. upload(folder, files)

Send `FormData` with `files` and `folder`, return the persisted `ids[]` from your API.

Private helpers (such as `toFileData`) come before the public methods.

### 2. download(fileId)

`GET` the file with `responseType: 'blob'`, build `TextEditorFileData` with `URL.createObjectURL(blob)` and return it.

The editor calls `upload()` when the user adds an image, then `download(id)` for preview. On load, it calls `download(id)` for every `data-id` in the HTML.

Inserted in the editor (preview only):

```html
<img src="blob:..." data-id="file-id-from-api" class="editor-image" />
```

Persisted in your database:

```html
<img data-id="file-id-from-api" class="editor-image" />
```

### 3. Register the service

Provide your `FileService` on the page that uses the editor:

```typescript
providers: [{ provide: TextEditorFileService, useExisting: FileService }],
```

Pass the folder to the editor:

```html
<app-text-editor [formControl]="contentControl" [imageFolder]="imageFolder" />
```

### 4. Extract image IDs

Each image is stored in the HTML as `data-id` on the `<img>` tag. Read the form control value and collect the ids:

```typescript
const content = this.contentControl.value;
// '<p>Hello</p><img data-id="file-id-from-api" class="editor-image" />'

const assetsIds = extractTextEditorImageIds(content);
// ['file-id-from-api']
```

Alternatively, use `viewChild(TextEditor)` and read `attachedImageIds()` — a signal updated on every editor change.

### 5. Save the form

Send the normalized HTML and the extracted ids to your API:

```typescript
// POST { content, assetsIds }
```

The editor removes temporary `blob:` URLs from the form value via `normalizeTextEditorHtml()`.

## API

| Export | Description |
| --- | --- |
| `TextEditorFileService` | Contract with `upload(folder, files)` and `download(fileId)`. |
| `TextEditorFileData` | `{ id, name, type, url }` returned by `download()`. |
| `extractTextEditorImageIds(html)` | Parses the HTML and returns every `data-id` from `<img>` tags. |
| `normalizeTextEditorHtml(html)` | Removes temporary `blob:` URLs from HTML (applied automatically on output). |
| `attachedImageIds` | Signal on `<app-text-editor>` with the current attached ids (same values as above). |
| `imageFolder` | Input on `<app-text-editor>` passed to `upload()`. |
