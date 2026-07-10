import { TextAlign as TextAlignExtension } from '@tiptap/extension-text-align';

export const TextAlign = TextAlignExtension.configure({
  types: ['heading', 'paragraph'],
});
