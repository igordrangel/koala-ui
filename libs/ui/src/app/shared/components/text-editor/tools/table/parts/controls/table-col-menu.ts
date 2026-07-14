import { Dropdown, DropdownContainer } from '@/shared/components/dropdown';
import { InputColor } from '@/shared/components/input-color';
import { Component, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableAxisMenuBase } from './table-axis-menu.base';
import {
  getCellAtColumn,
  getColumnIndex,
  getColumnIndexFromPoint,
  isPointerInColumnZone,
  resolveTableColumnAt,
} from './utils/table-dom';
import { getColumnControlLayout, getScrollContainer } from './utils/table-position';
import { moveTableColumn, selectTableColumn } from './utils/table-prosemirror';

@Component({
  selector: 'app-text-editor-table-col-menu',
  templateUrl: './table-col-menu.html',
  imports: [Dropdown, InputColor, ReactiveFormsModule],
  host: { class: 'absolute inset-0 pointer-events-none z-20' },
})
export class TableColMenu extends TableAxisMenuBase {
  private readonly columnMenu = viewChild<DropdownContainer>('columnMenu');

  readonly position = signal({ top: 0, left: 0, width: 0 });

  protected getMenu(): DropdownContainer | undefined {
    return this.columnMenu();
  }

  protected getCellAtIndex(table: HTMLTableElement, index: number): HTMLTableCellElement | null {
    return getCellAtColumn(table, index);
  }

  protected getIndexFromCell(cell: HTMLTableCellElement): number {
    return getColumnIndex(cell);
  }

  protected getIndexFromPoint(clientX: number, _clientY: number): number {
    return this.hoveredTable ? getColumnIndexFromPoint(this.hoveredTable, clientX) : -1;
  }

  protected resolveTableAt(clientX: number, clientY: number) {
    const result = resolveTableColumnAt(this.editor().view.dom, clientX, clientY);

    return result ? { table: result.table, index: result.columnIndex } : null;
  }

  protected isPointerInZone(clientX: number, clientY: number): boolean {
    return this.hoveredTable
      ? isPointerInColumnZone(this.hoveredTable, this.hoveredIndex, clientX, clientY)
      : false;
  }

  protected syncPosition(table: HTMLTableElement, index: number): void {
    const scrollContainer = getScrollContainer(this.editor());
    const layout = scrollContainer ? getColumnControlLayout(table, index, scrollContainer) : null;

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
      table && scrollContainer ? getColumnControlLayout(table, index, scrollContainer) : null;

    if (layout) {
      this.dropPreview.set(layout.preview);
    }
  }

  protected getDragCoordinate(event: PointerEvent): number {
    return event.clientX;
  }

  protected getMoveDirections() {
    return { forward: 'right', backward: 'left' };
  }

  protected selectAxis(): boolean {
    const $cell = this.resolveAxisCell();

    if (!$cell) {
      return false;
    }

    selectTableColumn(this.editor(), $cell);

    return true;
  }

  protected moveStep(direction: 'left' | 'right'): boolean {
    const table = this.hoveredTable;
    const $cell = this.resolveAxisCell();

    if (!table || !$cell) {
      return false;
    }

    const targetCol = moveTableColumn(this.editor(), $cell, direction);

    if (targetCol === null) {
      return false;
    }

    this.syncFromIndex(table, targetCol);

    return true;
  }

  moveColumnLeft(): void {
    this.swapAxis('left');
  }

  moveColumnRight(): void {
    this.swapAxis('right');
  }

  addColumnBefore(): void {
    this.mutateAxis(
      (chain) => chain.addColumnBefore(),
      () => this.hoveredIndex++,
    );
  }

  addColumnAfter(): void {
    this.mutateAxis((chain) => chain.addColumnAfter());
  }

  deleteColumn(): void {
    this.mutateAxis((chain) => chain.deleteColumn());
  }
}
