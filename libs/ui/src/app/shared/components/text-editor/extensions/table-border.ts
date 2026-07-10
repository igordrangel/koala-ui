import { Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { Table } from '@tiptap/extension-table/table';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableBorder: {
      setTableBorderColor: (color: string | null) => ReturnType;
    };
  }
}

const tableBorderPluginKey = new PluginKey('tableBorderColor');

function syncTableBorderColors(view: EditorView) {
  view.state.doc.descendants((node, pos) => {
    if (node.type.name !== 'table') {
      return;
    }

    const dom = view.nodeDOM(pos);

    if (!dom) {
      return;
    }

    const tableEl =
      dom instanceof HTMLTableElement ? dom : (dom as HTMLElement).querySelector('table');

    if (!tableEl) {
      return;
    }

    const color = node.attrs['borderColor'] as string | null;

    if (color) {
      tableEl.style.setProperty('--table-border-color', color);
      tableEl.dataset['borderColor'] = '';
    } else {
      tableEl.style.removeProperty('--table-border-color');
      delete tableEl.dataset['borderColor'];
    }
  });
}

export const TableWithBorder = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      borderColor: {
        default: null,
        parseHTML: (element) => {
          const table = element.tagName === 'TABLE' ? element : element.querySelector('table');

          if (!table?.hasAttribute('data-border-color')) {
            return null;
          }

          const value = table.style.getPropertyValue('--table-border-color').trim();

          return value || null;
        },
        renderHTML: (attributes) => {
          if (!attributes['borderColor']) {
            return {};
          }

          return {
            'data-border-color': '',
            style: `--table-border-color: ${attributes['borderColor']}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setTableBorderColor:
        (color) =>
        ({ state, dispatch }) => {
          const { $from } = state.selection;

          for (let depth = $from.depth; depth > 0; depth--) {
            const node = $from.node(depth);

            if (node.type.name !== 'table') {
              continue;
            }

            if (dispatch) {
              const pos = $from.before(depth);

              dispatch(
                state.tr.setNodeMarkup(pos, undefined, {
                  borderColor: color,
                }),
              );
            }

            return true;
          }

          return false;
        },
    };
  },

  addProseMirrorPlugins() {
    const parent = this.parent?.() ?? [];

    return [
      ...parent,
      new Plugin({
        key: tableBorderPluginKey,
        view: (view) => {
          syncTableBorderColors(view);

          return {
            update: (updatedView) => {
              syncTableBorderColors(updatedView);
            },
          };
        },
      }),
    ];
  },
});
