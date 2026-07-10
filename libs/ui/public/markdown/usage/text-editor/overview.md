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
