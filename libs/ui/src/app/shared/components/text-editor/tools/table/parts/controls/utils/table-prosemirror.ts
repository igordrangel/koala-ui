import { ChainedCommands, Editor } from '@tiptap/core';
import { Node, ResolvedPos } from '@tiptap/pm/model';
import { Transaction } from '@tiptap/pm/state';
import { CellSelection, TableMap, cellAround } from '@tiptap/pm/tables';
import { getCellAtColumn } from './table-dom';

export const TABLE_BORDER_TRANSPARENT = 'transparent';

function getTableContext($pos: ResolvedPos) {
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === 'table') {
      return {
        node: $pos.node(depth),
        pos: $pos.before(depth),
      };
    }
  }

  return null;
}

function syncTableBorderColorDom(table: HTMLTableElement, color: string | null): void {
  if (color) {
    table.style.setProperty('--table-border-color', color);
    table.dataset['borderColor'] = '';
    return;
  }

  table.style.removeProperty('--table-border-color');
  delete table.dataset['borderColor'];
}

export { syncTableBorderColorDom };

export function swapNodes(tr: Transaction, posA: number, posB: number): Transaction {
  const nodeA = tr.doc.nodeAt(posA);
  const nodeB = tr.doc.nodeAt(posB);

  if (!nodeA || !nodeB) {
    return tr;
  }

  if (posA < posB) {
    tr = tr.replaceWith(posB, posB + nodeB.nodeSize, nodeA);
    return tr.replaceWith(posA, posA + nodeA.nodeSize, nodeB);
  }

  tr = tr.replaceWith(posA, posA + nodeA.nodeSize, nodeB);
  return tr.replaceWith(posB, posB + nodeB.nodeSize, nodeA);
}

export function resolveCellFromDom(editor: Editor, cell: HTMLTableCellElement) {
  const domPos = editor.view.posAtDOM(cell, 0);
  return cellAround(editor.state.doc.resolve(domPos));
}

export function focusCell(editor: Editor, $cell: NonNullable<ReturnType<typeof resolveCellFromDom>>): boolean {
  return editor.chain().focus().setTextSelection($cell.pos + 1).run();
}

export function getRowPosition(tableNode: Node, tableStart: number, rowIndex: number): number {
  let pos = tableStart + 1;

  for (let index = 0; index < rowIndex; index++) {
    pos += tableNode.child(index).nodeSize;
  }

  return pos;
}

type ResolvedCell = NonNullable<ReturnType<typeof resolveCellFromDom>>;

export function selectTableColumn(editor: Editor, $cell: ResolvedCell): void {
  editor.view.dispatch(editor.state.tr.setSelection(CellSelection.colSelection($cell)));
  editor.commands.focus();
}

export function selectTableRow(editor: Editor, $cell: ResolvedCell): void {
  editor.view.dispatch(editor.state.tr.setSelection(CellSelection.rowSelection($cell)));
  editor.commands.focus();
}

export function moveTableColumn(
  editor: Editor,
  $cell: ResolvedCell,
  direction: 'left' | 'right',
): number | null {
  const tableNode = $cell.node(-1);
  const tableStart = $cell.start(-1);
  const map = TableMap.get(tableNode);
  const colIndex = map.colCount($cell.pos - tableStart);
  const targetCol = direction === 'left' ? colIndex - 1 : colIndex + 1;

  if (targetCol < 0 || targetCol >= map.width) {
    return null;
  }

  let { tr } = editor.state;

  for (let row = map.height - 1; row >= 0; row--) {
    const posA = tableStart + map.positionAt(row, colIndex, tableNode);
    const posB = tableStart + map.positionAt(row, targetCol, tableNode);
    tr = swapNodes(tr, posA, posB);
  }

  editor.view.dispatch(tr);
  editor.commands.focus();

  return targetCol;
}

export function moveTableRow(
  editor: Editor,
  $cell: ResolvedCell,
  direction: 'up' | 'down',
): number | null {
  const tableNode = $cell.node(-1);
  const tableStart = $cell.start(-1);
  const map = TableMap.get(tableNode);
  const rowIndex = map.findCell($cell.pos - tableStart).top;
  const targetRow = direction === 'up' ? rowIndex - 1 : rowIndex + 1;

  if (targetRow < 0 || targetRow >= map.height) {
    return null;
  }

  let { tr } = editor.state;
  tr = swapNodes(
    tr,
    getRowPosition(tableNode, tableStart, rowIndex),
    getRowPosition(tableNode, tableStart, targetRow),
  );

  editor.view.dispatch(tr);
  editor.commands.focus();

  return targetRow;
}

export function runEditorCommand(
  editor: Editor,
  command: (chain: ChainedCommands) => ChainedCommands,
): boolean {
  return command(editor.chain().focus()).run();
}

export function suppressNextTriggerClick(): void {
  const suppress = (event: Event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    document.removeEventListener('click', suppress, true);
  };

  document.addEventListener('click', suppress, true);
}

export function getTableBorderColor(
  editor: Editor,
  table: HTMLTableElement,
): string | null {
  const cell =
    getCellAtColumn(table, 0) ?? (table.querySelector('td, th') as HTMLTableCellElement | null);

  if (!cell) {
    return null;
  }

  const $cell = resolveCellFromDom(editor, cell);

  if (!$cell) {
    return null;
  }

  const tableContext = getTableContext($cell);

  const borderColor = tableContext?.node.attrs['borderColor'];

  return borderColor || null;
}

export function colorNameToBorderColor(colorName: string | null): string {
  if (!colorName) {
    return TABLE_BORDER_TRANSPARENT;
  }

  return `var(--${colorName})`;
}

export function borderColorToColorName(borderColor: string | null): string | null {
  if (!borderColor || borderColor === TABLE_BORDER_TRANSPARENT) {
    return null;
  }

  const match = borderColor.match(/^var\(--(.+)\)$/);

  return match?.[1] ?? null;
}

export function setTableBorderColor(
  editor: Editor,
  table: HTMLTableElement,
  color: string | null,
): boolean {
  const cell =
    getCellAtColumn(table, 0) ?? (table.querySelector('td, th') as HTMLTableCellElement | null);

  if (!cell) {
    return false;
  }

  const $cell = resolveCellFromDom(editor, cell);

  if (!$cell) {
    return false;
  }

  const tableContext = getTableContext($cell);

  if (!tableContext) {
    return false;
  }

  editor.view.dispatch(
    editor.state.tr.setNodeMarkup(tableContext.pos, undefined, {
      borderColor: color,
    }),
  );

  syncTableBorderColorDom(table, color);

  return true;
}
