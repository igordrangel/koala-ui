export interface ImageToUpload {
  file: File;
  position: number;
}

export interface ImageUploadResult {
  src: string;
  id?: string | null;
  alt?: string | null;
}

export interface ImageUploadContext {
  position: number;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function extractTextEditorImageIds(html: string): string[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  return [...doc.body.querySelectorAll('img[data-id]')]
    .map((image) => image.getAttribute('data-id'))
    .filter((id): id is string => !!id);
}

export function normalizeTextEditorHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.body.querySelectorAll('img[data-id]').forEach((image) => {
    const src = image.getAttribute('src');

    if (src?.startsWith('blob:')) {
      image.removeAttribute('src');
    }
  });

  return doc.body.innerHTML;
}
