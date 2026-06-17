export function mimeTypeByExtension(filename: string) {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'xml':
      return 'text/xml';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    default:
      throw new Error('Unsupported file type');
  }
}
