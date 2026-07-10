import { Image as ImageExtension } from '@tiptap/extension-image';
import { FileHandler as FileHandlerExtension } from '@tiptap/extension-file-handler';
import { isImageFile } from '../common/image-upload.service';

type ImageFilesHandler = (files: File[], position?: number) => void;

let imageFilesHandler: ImageFilesHandler | null = null;

export function setImageFilesHandler(handler: ImageFilesHandler | null) {
  imageFilesHandler = handler;
}

function handleImageFiles(files: File[], position?: number) {
  imageFilesHandler?.(files, position);
}

const Image = ImageExtension.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: (attributes) =>
          attributes['width']
            ? { width: attributes['width'], style: `width: ${attributes['width']}px` }
            : {},
        parseHTML: (element) => {
          const width = element.getAttribute('width') ?? element.style.width;
          return width ? Number.parseInt(width, 10) : null;
        },
      },
      height: {
        default: null,
        renderHTML: (attributes) =>
          attributes['height']
            ? { height: attributes['height'], style: `height: ${attributes['height']}px` }
            : {},
        parseHTML: (element) => {
          const height = element.getAttribute('height') ?? element.style.height;
          return height ? Number.parseInt(height, 10) : null;
        },
      },
      'data-id': {
        default: null,
        renderHTML: (attributes) => ({ 'data-id': attributes['data-id'] }),
        parseHTML: (element) => element.getAttribute('data-id'),
      },
    };
  },
}).configure({
  inline: true,
  allowBase64: true,
  resize: {
    enabled: true,
    minWidth: 50,
    minHeight: 50,
    alwaysPreserveAspectRatio: true,
  },
  HTMLAttributes: {
    class: 'editor-image',
  },
});

const FileHandler = FileHandlerExtension.configure({
  onDrop: (_, droppedFiles, pos) => handleImageFiles(droppedFiles, pos),
  onPaste: (_, pastedFiles) => handleImageFiles(pastedFiles),
});

export const ImageDefs = {
  extensions: [Image, FileHandler],
  isImageFile,
};
