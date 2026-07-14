import { Component, DestroyRef, effect, inject, input, linkedSignal, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { ImageToUpload, isImageFile } from '../common/image-upload.service';
import { TextEditorImageUploadService } from '../common/image-upload.bridge';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-image',
  template: `
    <input #inputFile class="hidden" type="file" accept="image/*" (change)="addImage($event)" />
    <app-text-editor-tool-button
      iconClass="app-icon add-image size-5!"
      tooltip="Adicionar Imagem"
      [activeName]="activeName"
      [editor]="editor()"
      [isActive]="isActive()"
      [canToggle]="canToggle()"
      (action)="inputFile.click()"
    />
  `,
  imports: [ToolButton],
})
export class Image extends ToolBase {
  private readonly destroyRef = inject(DestroyRef);
  private readonly imageUploadService = inject(TextEditorImageUploadService);

  readonly activeName = 'image';
  readonly files = input<ImageToUpload[]>([]);

  readonly filesUploaded = output<void>();

  readonly imagesToUpload = linkedSignal<ImageToUpload[]>(this.files);

  protected checkCanToggle(): boolean {
    return true;
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  constructor() {
    super();

    effect(() => {
      const imagesToUpload = this.imagesToUpload();

      if (imagesToUpload.length === 0) {
        return;
      }

      this.uploadImages(imagesToUpload);
    });
  }

  private uploadImages(imagesToUpload: ImageToUpload[]) {
    const images = imagesToUpload.filter((image) => isImageFile(image.file));

    if (images.length === 0) {
      this.imagesToUpload.set([]);
      this.filesUploaded.emit();
      return;
    }

    forkJoin(
      images.map((image) =>
        this.imageUploadService.upload(image.file, { position: image.position }),
      ),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (uploadedFiles) => {
          uploadedFiles.forEach((uploaded) => {
            this.editor()
              .chain()
              .focus()
              .insertContent({
                type: 'image',
                attrs: {
                  src: uploaded.src,
                  alt: uploaded.alt,
                  'data-id': uploaded.id,
                },
              })
              .run();
          });

          this.imagesToUpload.set([]);
          this.filesUploaded.emit();
        },
        error: () => {
          this.imagesToUpload.set([]);
          this.filesUploaded.emit();
        },
      });
  }

  addImage(event?: Event) {
    if (!event) {
      return;
    }

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    input.value = '';

    if (!file || !isImageFile(file)) {
      return;
    }

    this.imagesToUpload.set([{ file, position: 0 }]);
  }
}
