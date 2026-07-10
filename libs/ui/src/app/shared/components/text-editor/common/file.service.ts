import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { fileToBase64 } from './image-upload.service';

export interface TextEditorFileData {
  id: string;
  name: string;
  type: string;
  url: string;
}

export abstract class TextEditorFileService {
  abstract upload(folder: number, files: File[]): Observable<string[]>;

  abstract download(fileId: string): Observable<TextEditorFileData | null>;
}

@Injectable()
export class Base64TextEditorFileService extends TextEditorFileService {
  private readonly cache = new Map<string, TextEditorFileData>();

  upload(_folder: number, files: File[]): Observable<string[]> {
    return forkJoin(
      files.map((file) =>
        from(fileToBase64(file)).pipe(
          tap((url) => {
            this.cache.set(file.name, {
              id: file.name,
              name: file.name,
              type: file.type,
              url,
            });
          }),
          map(() => file.name),
        ),
      ),
    );
  }

  download(fileId: string): Observable<TextEditorFileData | null> {
    return of(this.cache.get(fileId) ?? null);
  }
}
