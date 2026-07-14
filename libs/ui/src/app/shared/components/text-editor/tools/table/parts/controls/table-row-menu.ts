import { Dropdown, DropdownContainer } from '@/shared/components/dropdown';
import { InputColor } from '@/shared/components/input-color';
import { Component, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableAxisMenuBase } from './table-axis-menu.base';
import {
  getCellAtRow,
  getRowIndex,
  getRowIndexFromPoint,
  isPointerInRowZone,
  resolveTableRowAt,
} from './utils/table-dom';
import { getRowControlLayout, getScrollContainer } from './utils/table-position';
import { moveTableRow, selectTableRow } from './utils/table-prosemirror';

@Component({
  selector: 'app-text-editor-table-row-menu',
  templateUrl: './table-row-menu.html',
  imports: [Dropdown, InputColor, ReactiveFormsModule],
  host: { class: 'absolute inset-0 pointer-events-none z-20' },
})
export class TableRowMenu extends TableAxisMenuBase {
  private readonly rowMenu = viewChild<DropdownContainer>('rowMenu');

  readonly position = signal({ top: 0, left: 0, height: 0 });

  protected getMenu(): DropdownContainer | undefined {
    return this.rowMenu();
  }

  protected getCellAtIndex(table: HTMLTableElement, index: number): HTMLTableCellElement | null {
    return getCellAtRow(table, index);
  }

  protected getIndexFromCell(cell: HTMLTableCellElement): number {
    return getRowIndex(cell);
  }

  protected getIndexFromPoint(_clientX: number, clientY: number): number {
    return this.hoveredTable ? getRowIndexFromPoint(this.hoveredTable, clientY) : -1;
  }

  protected resolveTableAt(clientX: number, clientY: number) {
    const result = resolveTableRowAt(this.editor().view.dom, clientX, clientY);

    return result ? { table: result.table, index: result.rowIndex } : null;
  }

  protected isPointerInZone(clientX: number, clientY: number): boolean {
    return this.hoveredTable
      ? isPointerInRowZone(this.hoveredTable, this.hoveredIndex, clientX, clientY)
      : false;
  }

  protected syncPosition(table: HTMLTableElement, index: number): void {
    const scrollContainer = getScrollContainer(this.editor());
    const layout = scrollContainer ? getRowControlLayout(table, index, scrollContainer) : null;

    if (!layout) {
      this.hide();
      return;
    }

    this.position.set(layout.menu);
  }

  protected updateDropPreviewPosition(index: number): void {
    const table = this.hoveredTable;
    const scrollContainer = getScrollContainer(this.editor());
    const layout =
      table && scrollContainer ? getRowControlLayout(table, index, scrollContainer) : null;

    if (layout) {
      this.dropPreview.set(layout.preview);
    }
  }

  protected getDragCoordinate(event: PointerEvent): number {
    return event.clientY;
  }

  protected getMoveDirections() {
    return { forward: 'down', backward: 'up' };
  }

  protected selectAxis(): boolean {
    const $cell = this.resolveAxisCell();

    if (!$cell) {
      return false;
    }

    selectTableRow(this.editor(), $cell);

    return true;
  }

  protected moveStep(direction: 'up' | 'down'): boolean {
    const table = this.hoveredTable;
    const $cell = this.resolveAxisCell();

    if (!table || !$cell) {
      return false;
    }

    const targetRow = moveTableRow(this.editor(), $cell, direction);

    if (targetRow === null) {
      return false;
    }

    this.syncFromIndex(table, targetRow);

    return true;
  }

  moveRowUp(): void {
    this.swapAxis('up');
  }

  moveRowDown(): void {
    this.swapAxis('down');
  }

  addRowBefore(): void {
    this.mutateAxis(
      (chain) => chain.addRowBefore(),
      () => this.hoveredIndex++,
    );
  }

  addRowAfter(): void {
    this.mutateAxis((chain) => chain.addRowAfter());
  }

  deleteRow(): void {
    this.mutateAxis((chain) => chain.deleteRow());
  }
}
