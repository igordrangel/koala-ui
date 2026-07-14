import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TextEditorFileService } from './file.service';
import { ImageUploadContext, ImageUploadResult } from './image-upload.service';

export abstract class TextEditorImageUploadService {
  abstract upload(file: File, context: ImageUploadContext): Observable<ImageUploadResult>;

  abstract resolve(id: string): Observable<ImageUploadResult | null>;

  abstract resolveHtml(html: string): Observable<string>;
}

@Injectable()
export class TextEditorImageFolder {
  private folder = 1;

  setFolder(folder: number) {
    this.folder = folder;
  }

  folderValue() {
    return this.folder;
  }
}

@Injectable()
export class TextEditorImageUploadBridge extends TextEditorImageUploadService {
  private readonly fileService = inject(TextEditorFileService);
  private readonly imageFolder = inject(TextEditorImageFolder);

  upload(file: File, _context: ImageUploadContext): Observable<ImageUploadResult> {
    return this.fileService.upload(this.imageFolder.folderValue(), [file]).pipe(
      switchMap((ids) => this.fileService.download(ids[0])),
      map((fileData) => ({
        src: fileData!.url,
        id: fileData!.id,
        alt: file.name,
      })),
    );
  }

  resolve(id: string): Observable<ImageUploadResult | null> {
    return this.fileService.download(id).pipe(
      map((fileData) =>
        fileData
          ? {
              id: fileData.id,
              src: fileData.url,
              alt: fileData.name,
            }
          : null,
      ),
    );
  }

  resolveHtml(html: string): Observable<string> {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const images = [...doc.body.querySelectorAll('img')];
    const fileIds = images
      .map((image) => image.getAttribute('data-id'))
      .filter((id): id is string => !!id);

    if (fileIds.length === 0) {
      return of(html);
    }

    const uniqueFileIds = [...new Set(fileIds)];

    return forkJoin(
      uniqueFileIds.map((id) =>
        this.fileService.download(id).pipe(
          map((fileData) => ({ id, fileData })),
          catchError(() => of({ id, fileData: null })),
        ),
      ),
    ).pipe(
      map((entries) => {
        const resolvedById = new Map(
          entries
            .filter(
              (entry): entry is { id: string; fileData: NonNullable<typeof entry.fileData> } =>
                entry.fileData !== null,
            )
            .map((entry) => [entry.id, entry.fileData]),
        );

        images.forEach((image) => {
          const fileId = image.getAttribute('data-id');
          const fileData = fileId ? resolvedById.get(fileId) : null;

          if (fileData) {
            image.setAttribute('src', fileData.url);

            if (fileData.name) {
              image.setAttribute('alt', fileData.name);
            }
          }
        });

        return doc.body.innerHTML;
      }),
    );
  }
}
