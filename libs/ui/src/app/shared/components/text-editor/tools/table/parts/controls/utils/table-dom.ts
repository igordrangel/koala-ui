export const CONTROL_ZONE_SIZE = 32;
export const TRIGGER_WIDTH = 32;

export function getCellFromTarget(target: EventTarget | null): HTMLTableCellElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest('td, th');
}

export function getColumnIndex(cell: HTMLTableCellElement): number {
  const row = cell.parentElement;

  if (!row) {
    return -1;
  }

  const cells = row.querySelectorAll(':scope > td, :scope > th');
  return Array.from(cells).indexOf(cell);
}

export function getRowIndex(cell: HTMLTableCellElement): number {
  const row = cell.closest('tr');
  const table = cell.closest('table');

  if (!row || !table) {
    return -1;
  }

  const rows = table.querySelectorAll('tr');
  return Array.from(rows).indexOf(row);
}

export function getCellAtColumn(
  table: HTMLTableElement,
  columnIndex: number,
): HTMLTableCellElement | null {
  for (const row of table.querySelectorAll('tr')) {
    const cell = row.querySelectorAll(':scope > td, :scope > th')[columnIndex] as
      | HTMLTableCellElement
      | undefined;

    if (cell) {
      return cell;
    }
  }

  return null;
}

export function getRowAtIndex(
  table: HTMLTableElement,
  rowIndex: number,
): HTMLTableRowElement | null {
  return table.querySelectorAll('tr')[rowIndex] ?? null;
}

export function getCellAtRow(
  table: HTMLTableElement,
  rowIndex: number,
): HTMLTableCellElement | null {
  return getRowAtIndex(table, rowIndex)?.querySelector(':scope > td, :scope > th') ?? null;
}

export function getColumnIndexFromPoint(table: HTMLTableElement, clientX: number): number {
  const row = table.querySelector('tr');

  if (!row) {
    return -1;
  }

  const cells = row.querySelectorAll(':scope > td, :scope > th');

  for (let index = 0; index < cells.length; index++) {
    const rect = cells[index].getBoundingClientRect();

    if (clientX >= rect.left && clientX < rect.right) {
      return index;
    }
  }

  return -1;
}

export function getRowIndexFromPoint(table: HTMLTableElement, clientY: number): number {
  const rows = table.querySelectorAll('tr');

  for (let index = 0; index < rows.length; index++) {
    const rect = rows[index].getBoundingClientRect();

    if (clientY >= rect.top && clientY < rect.bottom) {
      return index;
    }
  }

  return -1;
}

export function isLastColumnCell(cell: HTMLTableCellElement): boolean {
  const row = cell.parentElement;

  if (!row) {
    return false;
  }

  const cells = row.querySelectorAll(':scope > td, :scope > th');
  return cells[cells.length - 1] === cell;
}

export function isLastRowCell(cell: HTMLTableCellElement): boolean {
  const row = cell.closest('tr');
  const table = cell.closest('table');

  if (!row || !table) {
    return false;
  }

  const rows = table.querySelectorAll('tr');
  return rows[rows.length - 1] === row;
}

function findTableAxisAt(
  editorDom: Element,
  clientX: number,
  clientY: number,
  isInHitArea: (tableRect: DOMRect) => boolean,
  getIndex: (table: HTMLTableElement) => number,
): { table: HTMLTableElement; index: number } | null {
  for (const table of editorDom.querySelectorAll('table')) {
    const tableRect = table.getBoundingClientRect();

    if (!isInHitArea(tableRect)) {
      continue;
    }

    const index = getIndex(table);

    if (index >= 0) {
      return { table, index };
    }
  }

  return null;
}

export function resolveTableColumnAt(
  editorDom: Element,
  clientX: number,
  clientY: number,
): { table: HTMLTableElement; columnIndex: number } | null {
  const result = findTableAxisAt(
    editorDom,
    clientX,
    clientY,
    (tableRect) =>
      clientY >= tableRect.top - CONTROL_ZONE_SIZE &&
      clientY <= tableRect.bottom &&
      clientX >= tableRect.left &&
      clientX <= tableRect.right,
    (table) => getColumnIndexFromPoint(table, clientX),
  );

  return result ? { table: result.table, columnIndex: result.index } : null;
}

export function resolveTableRowAt(
  editorDom: Element,
  clientX: number,
  clientY: number,
): { table: HTMLTableElement; rowIndex: number } | null {
  const result = findTableAxisAt(
    editorDom,
    clientX,
    clientY,
    (tableRect) =>
      clientX >= tableRect.left - CONTROL_ZONE_SIZE - TRIGGER_WIDTH &&
      clientX <= tableRect.right &&
      clientY >= tableRect.top &&
      clientY <= tableRect.bottom,
    (table) => getRowIndexFromPoint(table, clientY),
  );

  return result ? { table: result.table, rowIndex: result.index } : null;
}

export function isPointerInColumnZone(
  table: HTMLTableElement,
  columnIndex: number,
  clientX: number,
  clientY: number,
): boolean {
  const cell = getCellAtColumn(table, columnIndex);

  if (!cell) {
    return false;
  }

  const cellRect = cell.getBoundingClientRect();
  const tableRect = table.getBoundingClientRect();

  return (
    clientX >= cellRect.left &&
    clientX < cellRect.right &&
    clientY >= tableRect.top - CONTROL_ZONE_SIZE &&
    clientY <= tableRect.bottom
  );
}

export function isPointerInRowZone(
  table: HTMLTableElement,
  rowIndex: number,
  clientX: number,
  clientY: number,
): boolean {
  const row = getRowAtIndex(table, rowIndex);

  if (!row) {
    return false;
  }

  const rowRect = row.getBoundingClientRect();
  const tableRect = table.getBoundingClientRect();
  const inRowY = clientY >= rowRect.top && clientY < rowRect.bottom;
  const inTriggerBand =
    clientX >= tableRect.left - CONTROL_ZONE_SIZE - TRIGGER_WIDTH && clientX < tableRect.left;
  const inRowBand = clientX >= tableRect.left && clientX <= tableRect.right && inRowY;

  return inRowY && (inTriggerBand || inRowBand);
}
