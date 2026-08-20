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
