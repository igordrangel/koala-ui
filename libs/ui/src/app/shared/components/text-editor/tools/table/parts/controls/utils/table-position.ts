import { Editor } from '@tiptap/core';
import { getCellAtColumn, getRowAtIndex } from './table-dom';

export function getScrollContainer(editor: Editor): HTMLElement | null {
  return editor.view.dom.parentElement;
}

export function toContainerCoords(
  rect: DOMRect,
  scrollContainer: HTMLElement,
): { top: number; left: number } {
  const containerRect = scrollContainer.getBoundingClientRect();

  return {
    top: rect.top - containerRect.top + scrollContainer.scrollTop,
    left: rect.left - containerRect.left + scrollContainer.scrollLeft,
  };
}

export function getTablePositionInContainer(
  table: HTMLTableElement,
  scrollContainer: HTMLElement,
) {
  const tableRect = table.getBoundingClientRect();
  const coords = toContainerCoords(tableRect, scrollContainer);

  return {
    ...coords,
    width: tableRect.width,
    height: tableRect.height,
  };
}

export interface ColumnControlLayout {
  menu: { top: number; left: number; width: number };
  preview: { top: number; left: number; width: number; height: number };
}

export interface RowControlLayout {
  menu: { top: number; left: number; height: number };
  preview: { top: number; left: number; width: number; height: number };
}

export function getColumnControlLayout(
  table: HTMLTableElement,
  columnIndex: number,
  scrollContainer: HTMLElement,
): ColumnControlLayout | null {
  const cell = getCellAtColumn(table, columnIndex);

  if (!cell) {
    return null;
  }

  const tableRect = table.getBoundingClientRect();
  const cellRect = cell.getBoundingClientRect();
  const tableCoords = toContainerCoords(tableRect, scrollContainer);
  const cellCoords = toContainerCoords(cellRect, scrollContainer);

  return {
    menu: { top: tableCoords.top, left: cellCoords.left, width: cellRect.width },
    preview: {
      top: tableCoords.top,
      left: cellCoords.left,
      width: cellRect.width,
      height: tableRect.height,
    },
  };
}

export function getRowControlLayout(
  table: HTMLTableElement,
  rowIndex: number,
  scrollContainer: HTMLElement,
): RowControlLayout | null {
  const row = getRowAtIndex(table, rowIndex);

  if (!row) {
    return null;
  }

  const tableRect = table.getBoundingClientRect();
  const rowRect = row.getBoundingClientRect();
  const tableCoords = toContainerCoords(tableRect, scrollContainer);
  const rowCoords = toContainerCoords(rowRect, scrollContainer);

  return {
    menu: { top: rowCoords.top, left: tableCoords.left, height: rowRect.height },
    preview: {
      top: rowCoords.top,
      left: tableCoords.left,
      width: tableRect.width,
      height: rowRect.height,
    },
  };
}
