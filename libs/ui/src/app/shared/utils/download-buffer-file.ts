export function downloadBufferFile(data: ArrayBuffer, type: string, filename: string) {
  const file = new Blob([data], { type });
  const fileURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = fileURL;
  a.target = '_blank';
  a.download = filename;
  a.click();
  a.remove();
}
