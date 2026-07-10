import {
  booleanAttribute,
  Component,
  DestroyRef,
  effect,
  forwardRef,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Editor } from '@tiptap/core';
import { TiptapEditorDirective } from 'ngx-tiptap';
import { Subscription } from 'rxjs';
import { Base64TextEditorFileService, TextEditorFileService } from './common/file.service';
import {
  TextEditorImageFolder,
  TextEditorImageUploadBridge,
  TextEditorImageUploadService,
} from './common/image-upload.bridge';
import {
  extractTextEditorImageIds,
  ImageToUpload,
  isImageFile,
  normalizeTextEditorHtml,
} from './common/image-upload.service';
import { TextEditorExtensions } from './extensions';
import { setImageFilesHandler } from './extensions/image';
import { TextEditorToolbar } from './toolbar/text-editor-toolbar';
import { TableControls } from './tools/table/parts/controls/table-controls';
import { TableSelectionOverlay } from './tools/table/parts/selection-overlay/table-selection-overlay';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.html',
  imports: [TextEditorToolbar, TiptapEditorDirective, TableSelectionOverlay, TableControls],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditor),
      multi: true,
    },
    TextEditorImageFolder,
    TextEditorImageUploadBridge,
    Base64TextEditorFileService,
    {
      provide: TextEditorImageUploadService,
      useExisting: TextEditorImageUploadBridge,
    },
    {
      provide: TextEditorFileService,
      useFactory: () =>
        inject(TextEditorFileService, { optional: true, skipSelf: true }) ??
        inject(Base64TextEditorFileService),
    },
  ],
})
export class TextEditor implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);
  private readonly imageUploadService = inject(TextEditorImageUploadService);
  private readonly imageFolderHolder = inject(TextEditorImageFolder);

  private onChanged: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private formDisabled = false;
  private isWritingValue = false;
  private writeValueSubscription?: Subscription;
  private lastWrittenValue: string | null = null;

  readonly clickTriggered = signal(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly imageFolder = input(1, { transform: numberAttribute });
  readonly files = signal<ImageToUpload[]>([]);
  readonly attachedImageIds = signal<string[]>([]);

  readonly editor = new Editor({
    extensions: TextEditorExtensions,
    editorProps: {
      attributes: {
        class: 'py-8 px-6 h-full outline-hidden',
        spellcheck: 'false',
      },
      handleClick: () => {
        this.clickTriggered.set(true);
        setTimeout(() => this.clickTriggered.set(false), 300);
      },
    },
    onUpdate: ({ editor }) => {
      if (this.isWritingValue) {
        return;
      }

      const html = normalizeTextEditorHtml(editor.getHTML());
      this.attachedImageIds.set(extractTextEditorImageIds(html));
      this.onChanged(html);
    },
    onBlur: () => {
      this.onTouched();
    },
  });

  constructor() {
    setImageFilesHandler((files, position) => this.uploadFiles(files, position));

    effect(() => {
      this.imageFolderHolder.setFolder(this.imageFolder());
    });

    effect(() => {
      this.editor.setEditable(!this.disabled() && !this.formDisabled);
    });

    this.destroyRef.onDestroy(() => {
      this.writeValueSubscription?.unsubscribe();
      setImageFilesHandler(null);
      this.editor.destroy();
    });
  }

  uploadFiles(files: File[], position?: number) {
    const imagesToUpload: ImageToUpload[] = [];

    files.forEach((file, index) => {
      if (isImageFile(file)) {
        imagesToUpload.push({ file, position: position ?? index });
      }
    });

    if (imagesToUpload.length > 0) {
      this.files.set(imagesToUpload);
    }
  }

  clearFiles() {
    this.files.set([]);
  }

  writeValue(value: string | null): void {
    const html = value ?? '';

    if (this.lastWrittenValue === html) {
      return;
    }

    this.lastWrittenValue = html;
    this.writeValueSubscription?.unsubscribe();
    this.writeValueSubscription = this.imageUploadService
      .resolveHtml(html)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resolvedHtml) => {
        this.attachedImageIds.set(extractTextEditorImageIds(html));
        this.isWritingValue = true;
        this.editor.commands.setContent(resolvedHtml, { emitUpdate: false });
        this.isWritingValue = false;
      });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
    this.editor.setEditable(!this.disabled() && !this.formDisabled);
  }
}
