import { Highlight as HighlightExtension } from '@tiptap/extension-highlight';

export const Highlight = HighlightExtension.extend({
  addAttributes() {
    return {
      color: {
        default: null,
        // Força o Tiptap a renderizar 'bg-yellow-400' como class="bg-yellow-400"
        renderHTML: (attributes: any) => {
          if (!attributes.color) {
            return {};
          }
          return {
            class: attributes.color,
          };
        },
      },
    };
  },
}).configure({
  multicolor: true,
});
