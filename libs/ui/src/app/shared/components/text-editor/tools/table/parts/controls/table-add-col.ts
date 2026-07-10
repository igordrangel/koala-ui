import { Component, signal } from '@angular/core';
import { TableAddButtonBase } from './table-add-button.base';
import { isLastColumnCell } from './utils/table-dom';
import { runEditorCommand } from './utils/table-prosemirror';

@Component({
  selector: 'app-text-editor-table-add-col',
  templateUrl: './table-add-col.html',
  host: { class: 'absolute inset-0 pointer-events-none z-20' },
})
export class TableAddCol extends TableAddButtonBase {
  readonly position = signal({ top: 0, left: 0, height: 0 });

  protected isTargetCell(cell: HTMLTableCellElement): boolean {
    return isLastColumnCell(cell);
  }

  protected updatePosition(table: HTMLTableElement): void {
    const layout = this.getTableLayout(table);

    if (!layout) {
      return;
    }

    this.position.set({ top: layout.top, left: layout.left + layout.width, height: layout.height });
  }

  protected runAddCommand(): void {
    runEditorCommand(this.editor(), (chain) => chain.addColumnAfter());
  }
}
