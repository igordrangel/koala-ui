import { getColorByName } from '@/shared/components/input-color/colors';
import { Mark, mergeAttributes } from '@tiptap/core';

export const TextBackgroundColor = Mark.create({
  name: 'textBackgroundColor',
  addAttributes() {
    return {
      colorName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-bg-color-name'),
        renderHTML: (attributes: Record<string, string | null>) => {
          if (!attributes['colorName']) {
            return {};
          }

          const color = getColorByName(attributes['colorName']);

          if (!color) {
            return {};
          }

          return {
            'data-bg-color-name': attributes['colorName'],
            class: color.bgClass,
          };
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-bg-color-name]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});
