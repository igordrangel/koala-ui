import { Component, signal } from '@angular/core';
import { getLastRowCell, TableAddButtonBase } from './table-add-button.base';
import { isLastRowCell } from './utils/table-dom';
import { runEditorCommand } from './utils/table-prosemirror';

@Component({
  selector: 'app-text-editor-table-add-row',
  templateUrl: './table-add-row.html',
  host: { class: 'absolute inset-0 pointer-events-none z-20' },
})
export class TableAddRow extends TableAddButtonBase {
  readonly position = signal({ top: 0, left: 0, width: 0 });

  protected isTargetCell(cell: HTMLTableCellElement): boolean {
    return isLastRowCell(cell);
  }

  protected updatePosition(table: HTMLTableElement): void {
    const layout = this.getTableLayout(table);

    if (!layout) {
      return;
    }

    this.position.set({ top: layout.top + layout.height, left: layout.left, width: layout.width });
  }

  protected override syncFromTable(table: HTMLTableElement): void {
    this.hoveredTable = table;
    this.hoveredCell = getLastRowCell(table);
    this.updatePosition(table);
  }

  protected runAddCommand(): void {
    runEditorCommand(this.editor(), (chain) => chain.addRowAfter());
  }
}
