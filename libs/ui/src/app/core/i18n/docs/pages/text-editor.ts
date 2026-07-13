import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const TEXT_EDITOR_PAGE = {
  pt: {
    title: 'Text Editor',
    description: 'Um editor rich text baseado em Tiptap. Suporta headings, listas, tables, cores, imagens e mais via toolbar customizável.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente text editor.',
      },
      usage: {
        title: 'Uso',
        description: 'Vincule o editor a um reactive form control para ler e persistir o HTML gerado. Use extractTextEditorImageIds() no valor do control para coletar os ids dos arquivos anexados.',
        previewProse: [
          {
            title: 'Valor do formulário',
            description: 'HTML emitido pelo form control. Quando imagens passam por uma API, URLs blob: temporárias são removidas e só o data-id permanece.',
          },
          {
            title: 'IDs das imagens anexadas',
            description: 'IDs extraídos com extractTextEditorImageIds() do valor do formulário. Use essa lista como assetsIds ao salvar no backend.',
          },
          {
            title: 'Experimente',
            description: 'Adicione uma imagem pela toolbar, drag & drop ou colar. Por padrão o arquivo vai como base64. Com um TextEditorFileService customizado, o preview usa blob URLs e o valor persistido mantém só o id em data-id.',
          },
        ],
      },
      images: {
        title: 'Imagens',
        description: 'O tratamento de imagens é interno ao editor. Implemente TextEditorFileService com upload() e download() — em geral estendendo HttpBase (kl install http-base) — e forneça-o na página que usa o editor.',
        otherProse: [
          {
            title: '1. Enviar uma nova imagem',
            description: 'Quando o usuário adiciona uma imagem, o editor chama upload(folder, [file]) no TextEditorFileService, recebe o id persistido e depois download(id) para o preview.',
          },
          {
            title: '2. Resolver no carregamento',
            description: 'Quando o form control recebe HTML salvo, o editor chama download(id) para cada data-id antes de renderizar e define o src com a blob URL.',
          },
          {
            title: '3. Registrar o service',
            description: "Forneça seu FileService na página que usa o editor. Quando FileService estiver com providedIn: 'root', use useExisting:",
            followUp: 'Passe a pasta ao editor com [imageFolder].',
          },
          {
            title: '4. Extrair IDs das imagens',
            description: 'Cada imagem fica no HTML como atributo data-id em <img>. Ao salvar, leia o valor do form control e chame extractTextEditorImageIds(html) para coletar os ids em um array.',
            followUp: 'Como alternativa, use viewChild(TextEditor) e leia attachedImageIds() — um signal atualizado sempre que o conteúdo do editor muda.',
          },
          {
            title: '5. Salvar o formulário',
            description: 'Envie o HTML normalizado e os ids extraídos para a API. URLs blob: temporárias já foram removidas do valor do formulário pelo editor.',
          },
          {
            title: 'FileService',
            description: 'Estenda HttpBase e implemente TextEditorFileService com upload() e download(). Helpers privados vêm primeiro. O editor cuida do preview e da resolução do HTML internamente.',
          },
          {
            title: 'Usando o service em um formulário',
            description: 'Registre TextEditorFileService no componente, passe imageFolder ao editor e use extractTextEditorImageIds() no valor do formulário para montar assetsIds antes de salvar.',
          },
          {
            title: 'Lendo IDs de imagem com viewChild',
            description: 'Em vez de parsear o HTML, leia attachedImageIds() de um viewChild(TextEditor). As duas abordagens retornam os mesmos ids guardados em data-id.',
          },
        ],
      },
    },
  },
  en: {
    title: 'Text Editor',
    description: 'A rich text editor built with Tiptap. It supports headings, lists, tables, colors, images, and more through a customizable toolbar.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new text editor component.',
      },
      usage: {
        title: 'Usage',
        description: 'Bind the editor to a reactive form control to read and persist the generated HTML. Use extractTextEditorImageIds() on the control value to collect attached file ids.',
        previewProse: [
          {
            title: 'Form value',
            description: 'HTML emitted by the form control. When images go through an API, temporary blob: URLs are stripped and only data-id is kept.',
          },
          {
            title: 'Attached image IDs',
            description: 'IDs extracted with extractTextEditorImageIds() from the form value. Use this list as assetsIds when saving to your backend.',
          },
          {
            title: 'Try it',
            description: 'Add an image from the toolbar, drag & drop, or paste. By default the file is embedded as base64. With a custom TextEditorFileService, the preview uses blob URLs while the persisted value keeps only the file id in data-id.',
          },
        ],
      },
      images: {
        title: 'Images',
        description: 'Image handling is internal to the editor. Implement TextEditorFileService with upload() and download() — typically extending HttpBase (kl install http-base) — and provide it on the page that uses the editor.',
        otherProse: [
          {
            title: '1. Upload a new image',
            description: 'When the user adds an image, the editor calls upload(folder, [file]) on your TextEditorFileService, receives the persisted id, then calls download(id) for preview.',
          },
          {
            title: '2. Resolve on load',
            description: 'When the form control receives saved HTML, the editor calls download(id) for each data-id before rendering and sets src with the blob URL.',
          },
          {
            title: '3. Register the service',
            description: "Provide your FileService on the page that uses the editor. When FileService is providedIn: 'root', use useExisting:",
            followUp: 'Pass the folder to the editor with [imageFolder].',
          },
          {
            title: '4. Extract image IDs',
            description: 'Each image is persisted in the HTML as a data-id attribute on <img>. On save, read the form control value and call extractTextEditorImageIds(html) to collect every id into an array.',
            followUp: 'Alternatively, use viewChild(TextEditor) and read attachedImageIds() — a signal updated whenever the editor content changes.',
          },
          {
            title: '5. Save the form',
            description: 'Send the normalized HTML and the extracted ids to your API. Temporary blob: URLs are already removed from the form value by the editor.',
          },
          {
            title: 'FileService',
            description: 'Extend HttpBase and implement TextEditorFileService with upload() and download(). Private helpers come first. The editor handles preview and HTML resolution internally.',
          },
          {
            title: 'Using the service in a form',
            description: 'Register TextEditorFileService on the component, pass imageFolder to the editor and use extractTextEditorImageIds() on the form value to build assetsIds before saving.',
          },
          {
            title: 'Reading image IDs with viewChild',
            description: 'Instead of parsing the HTML, read attachedImageIds() from a viewChild(TextEditor) reference. Both approaches return the same ids stored in data-id.',
          },
        ],
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type TextEditorPageCopy = (typeof TEXT_EDITOR_PAGE)[Locale];
