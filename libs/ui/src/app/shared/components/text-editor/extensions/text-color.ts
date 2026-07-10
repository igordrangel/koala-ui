import { colorNameToFontClass, getColorByName } from '@/shared/components/input-color/colors';
import { Mark, mergeAttributes } from '@tiptap/core';

export const TextColor = Mark.create({
  name: 'textColor',
  addAttributes() {
    return {
      colorName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-color-name'),
        renderHTML: (attributes: Record<string, string | null>) => {
          if (!attributes['colorName']) {
            return {};
          }

          if (!getColorByName(attributes['colorName'])) {
            return {};
          }

          return {
            'data-color-name': attributes['colorName'],
            class: colorNameToFontClass(attributes['colorName']),
          };
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-color-name]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});
