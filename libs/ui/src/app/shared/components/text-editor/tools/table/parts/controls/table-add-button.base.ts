import { Directive, input, OnDestroy, OnInit, signal } from '@angular/core';
import { Editor } from '@tiptap/core';
import { getCellFromTarget } from './utils/table-dom';
import { getScrollContainer, getTablePositionInContainer } from './utils/table-position';
import { focusCell, resolveCellFromDom } from './utils/table-prosemirror';

@Directive()
export abstract class TableAddButtonBase implements OnInit, OnDestroy {
  readonly editor = input.required<Editor>();
  readonly visible = signal(false);

  protected hoveredCell: HTMLTableCellElement | null = null;
  protected hoveredTable: HTMLTableElement | null = null;

  private hoveringButton = false;
  private removeListeners?: () => void;

  protected abstract isTargetCell(cell: HTMLTableCellElement): boolean;
  protected abstract updatePosition(table: HTMLTableElement): void;
  protected abstract runAddCommand(): void;

  protected hide(): void {
    this.visible.set(false);
    this.hoveredCell = null;
    this.hoveredTable = null;
  }

  protected syncFromTable(table: HTMLTableElement): void {
    this.hoveredTable = table;
    this.updatePosition(table);
  }

  protected getTableLayout(table: HTMLTableElement) {
    const scrollContainer = getScrollContainer(this.editor());

    return scrollContainer ? getTablePositionInContainer(table, scrollContainer) : null;
  }

  private shouldTrackPosition(): boolean {
    return this.visible() || this.hoveringButton;
  }

  private handleMouseMove = (event: MouseEvent) => {
    const cell = getCellFromTarget(event.target);

    if (!cell || !this.isTargetCell(cell)) {
      if (!this.hoveringButton) {
        this.hide();
      }

      return;
    }

    const table = cell.closest('table');

    if (!table) {
      return;
    }

    this.hoveredCell = cell;
    this.hoveredTable = table;
    this.updatePosition(table);
    this.visible.set(true);
  };

  private handleMouseLeave = () => {
    if (!this.hoveringButton) {
      this.hide();
    }
  };

  private handleScroll = () => {
    if (!this.shouldTrackPosition() || !this.hoveredTable) {
      return;
    }

    this.updatePosition(this.hoveredTable);
  };

  private handleEditorUpdate = () => {
    if (!this.shouldTrackPosition() || !this.hoveredTable) {
      return;
    }

    if (!this.hoveredTable.isConnected) {
      this.hide();
      return;
    }

    this.syncFromTable(this.hoveredTable);
    this.visible.set(true);
  };

  onButtonMouseEnter(): void {
    this.hoveringButton = true;
  }

  onButtonMouseLeave(): void {
    this.hoveringButton = false;
    this.hide();
  }

  add(): void {
    const cell = this.hoveredCell;

    if (!cell) {
      return;
    }

    const $cell = resolveCellFromDom(this.editor(), cell);

    if (!$cell) {
      return;
    }

    focusCell(this.editor(), $cell);
    this.runAddCommand();
  }

  ngOnInit(): void {
    const editor = this.editor();
    const dom = editor.view.dom;
    const scrollContainer = getScrollContainer(editor);

    dom.addEventListener('mousemove', this.handleMouseMove);
    dom.addEventListener('mouseleave', this.handleMouseLeave);
    scrollContainer?.addEventListener('scroll', this.handleScroll, { passive: true });
    editor.on('update', this.handleEditorUpdate);

    this.removeListeners = () => {
      dom.removeEventListener('mousemove', this.handleMouseMove);
      dom.removeEventListener('mouseleave', this.handleMouseLeave);
      scrollContainer?.removeEventListener('scroll', this.handleScroll);
      editor.off('update', this.handleEditorUpdate);
    };
  }

  ngOnDestroy(): void {
    this.removeListeners?.();
  }
}

export function getLastRowCell(table: HTMLTableElement): HTMLTableCellElement | null {
  const rows = table.querySelectorAll('tr');
  const lastRow = rows[rows.length - 1];
  const cells = lastRow?.querySelectorAll(':scope > td, :scope > th');

  return (cells?.[cells.length - 1] as HTMLTableCellElement) ?? null;
}
