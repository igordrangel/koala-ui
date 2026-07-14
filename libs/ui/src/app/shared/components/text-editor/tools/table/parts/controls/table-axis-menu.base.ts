import { DropdownContainer } from '@/shared/components/dropdown';
import { Directive, computed, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChainedCommands, Editor } from '@tiptap/core';
import { getCellFromTarget } from './utils/table-dom';
import {
  borderColorToColorName,
  colorNameToBorderColor,
  focusCell,
  getTableBorderColor,
  resolveCellFromDom,
  runEditorCommand,
  setTableBorderColor as applyTableBorderColor,
  syncTableBorderColorDom,
  suppressNextTriggerClick,
  TABLE_BORDER_TRANSPARENT,
} from './utils/table-prosemirror';

export interface DropPreviewPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

const DRAG_THRESHOLD = 5;

@Directive()
export abstract class TableAxisMenuBase implements OnInit, OnDestroy {
  readonly editor = input.required<Editor>();
  readonly visible = signal(false);
  readonly showDropPreview = signal(false);
  readonly dropPreview = signal<DropPreviewPosition>({ top: 0, left: 0, width: 0, height: 0 });
  readonly tableBorderColor = signal<string | null>(null);
  readonly tableBorderColorSync = computed((): string | null | undefined => {
    const borderColor = this.tableBorderColor();

    if (!borderColor) {
      return undefined;
    }

    if (borderColor === TABLE_BORDER_TRANSPARENT) {
      return null;
    }

    return borderColorToColorName(borderColor) ?? undefined;
  });
  readonly borderColorControl = new FormControl<string | null>(null);

  protected hoveredTable: HTMLTableElement | null = null;
  protected hoveredIndex = -1;
  protected dropPreviewIndex = -1;
  protected hoveringMenu = false;
  protected menuOpen = false;

  private dragStarted = false;
  private isDragging = false;
  private dragStartCoord = 0;
  private removeListeners?: () => void;

  protected abstract getMenu(): DropdownContainer | undefined;
  protected abstract getCellAtIndex(
    table: HTMLTableElement,
    index: number,
  ): HTMLTableCellElement | null;
  protected abstract getIndexFromCell(cell: HTMLTableCellElement): number;
  protected abstract getIndexFromPoint(clientX: number, clientY: number): number;
  protected abstract resolveTableAt(
    clientX: number,
    clientY: number,
  ): { table: HTMLTableElement; index: number } | null;
  protected abstract isPointerInZone(clientX: number, clientY: number): boolean;
  protected abstract syncPosition(table: HTMLTableElement, index: number): void;
  protected abstract updateDropPreviewPosition(index: number): void;
  protected abstract moveStep(direction: string): boolean;
  protected abstract getMoveDirections(): { forward: string; backward: string };
  protected abstract selectAxis(): boolean;
  protected abstract getDragCoordinate(event: PointerEvent): number;

  protected resolveAxisCell() {
    const table = this.hoveredTable;

    if (!table || this.hoveredIndex < 0) {
      return null;
    }

    const cell = this.getCellAtIndex(table, this.hoveredIndex);

    return cell ? resolveCellFromDom(this.editor(), cell) : null;
  }

  protected focusAxis(): boolean {
    const $cell = this.resolveAxisCell();

    return $cell ? focusCell(this.editor(), $cell) : false;
  }

  protected moveTo(targetIndex: number): void {
    if (targetIndex < 0 || targetIndex === this.hoveredIndex) {
      return;
    }

    const { forward, backward } = this.getMoveDirections();

    while (this.hoveredIndex < targetIndex) {
      if (!this.moveStep(forward)) {
        break;
      }
    }

    while (this.hoveredIndex > targetIndex) {
      if (!this.moveStep(backward)) {
        break;
      }
    }

    this.selectAxis();
  }

  protected mutateAxis(
    command: (chain: ChainedCommands) => ChainedCommands,
    onSuccess?: () => void,
  ): void {
    this.runAxisCommand(() => {
      const ok = runEditorCommand(this.editor(), command);

      if (ok) {
        onSuccess?.();
      }

      return ok;
    });
  }

  protected hideDropPreview(): void {
    this.showDropPreview.set(false);
    this.dropPreviewIndex = -1;
  }

  protected hide(): void {
    this.visible.set(false);
    this.hoveredTable = null;
    this.hoveredIndex = -1;
    this.menuOpen = false;
    this.tableBorderColor.set(null);
    this.hideDropPreview();
  }

  protected syncFromIndex(table: HTMLTableElement, index: number): void {
    this.hoveredTable = table;
    this.hoveredIndex = index;
    this.syncPosition(table, index);

    const borderColor = getTableBorderColor(this.editor(), table);
    const colorName = borderColorToColorName(borderColor);

    this.tableBorderColor.set(borderColor);
    this.borderColorControl.setValue(colorName, { emitEvent: false });
  }

  onBorderColorPicked(colorName: string | null): void {
    this.setTableBorderColor(colorNameToBorderColor(colorName));
  }

  deleteTable(): void {
    this.mutateAxis(
      (chain) => chain.deleteTable(),
      () => this.hide(),
    );
  }

  protected runAxisCommand(command: () => boolean): void {
    if (!this.focusAxis()) {
      return;
    }

    if (command()) {
      this.getMenu()?.close();
    }
  }

  protected swapAxis(direction: string): void {
    if (this.moveStep(direction)) {
      this.selectAxis();
      this.getMenu()?.close();
    }
  }

  private shouldKeepVisible(): boolean {
    return this.visible() || this.hoveringMenu || this.isDragging;
  }

  private refreshPosition(): void {
    if (!this.hoveredTable || this.hoveredIndex < 0) {
      return;
    }

    this.syncFromIndex(this.hoveredTable, this.hoveredIndex);

    if (this.isDragging && this.dropPreviewIndex >= 0) {
      this.updateDropPreviewPosition(this.dropPreviewIndex);
    }
  }

  private handleDragMove = (event: PointerEvent) => {
    if (!this.dragStarted) {
      return;
    }

    if (
      !this.isDragging &&
      Math.abs(this.getDragCoordinate(event) - this.dragStartCoord) > DRAG_THRESHOLD
    ) {
      this.isDragging = true;
      this.getMenu()?.close();
    }

    if (!this.isDragging) {
      return;
    }

    const targetIndex = this.getIndexFromPoint(event.clientX, event.clientY);

    if (targetIndex < 0) {
      this.hideDropPreview();
      return;
    }

    this.dropPreviewIndex = targetIndex;
    this.updateDropPreviewPosition(targetIndex);
    this.showDropPreview.set(true);
  };

  private handleDragEnd = (event: PointerEvent) => {
    this.removeDragListeners();

    if (this.isDragging) {
      this.moveTo(this.dropPreviewIndex);
      this.hideDropPreview();
      this.hoveringMenu = false;
    } else {
      this.selectAxis();
      suppressNextTriggerClick();
      this.getMenu()?.open();
    }

    this.dragStarted = false;
    this.isDragging = false;

    event.preventDefault();
    event.stopPropagation();
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (this.isDragging || this.menuOpen) {
      return;
    }

    const cell = getCellFromTarget(event.target);

    if (!cell) {
      const resolved = this.resolveTableAt(event.clientX, event.clientY);

      if (resolved) {
        this.syncFromIndex(resolved.table, resolved.index);
        this.visible.set(true);
        return;
      }

      if (this.hoveringMenu || this.isPointerInZone(event.clientX, event.clientY)) {
        return;
      }

      this.hide();
      return;
    }

    const table = cell.closest('table');
    const index = this.getIndexFromCell(cell);

    if (!table || index < 0) {
      return;
    }

    this.syncFromIndex(table, index);
    this.visible.set(true);
  };

  private handleContainerMouseLeave = () => {
    if (!this.hoveringMenu && !this.isDragging && !this.menuOpen) {
      this.hide();
    }
  };

  private handleScroll = () => {
    if (!this.shouldKeepVisible()) {
      return;
    }

    this.refreshPosition();
  };

  private handleEditorUpdate = () => {
    if (!this.shouldKeepVisible()) {
      return;
    }

    if (!this.hoveredTable?.isConnected) {
      this.hide();
      return;
    }

    this.refreshPosition();
    this.visible.set(true);
  };

  private removeDragListeners(): void {
    document.removeEventListener('pointermove', this.handleDragMove);
    document.removeEventListener('pointerup', this.handleDragEnd);
    document.removeEventListener('pointercancel', this.handleDragEnd);
  }

  onMenuMouseEnter(): void {
    this.hoveringMenu = true;
  }

  onMenuMouseLeave(event: MouseEvent): void {
    if (this.isDragging || this.menuOpen) {
      return;
    }

    if (this.isPointerInZone(event.clientX, event.clientY)) {
      return;
    }

    this.hoveringMenu = false;
    this.hide();
  }

  onDropdownOpened(): void {
    this.menuOpen = true;
    this.hoveringMenu = true;
  }

  onDropdownClosed(): void {
    this.menuOpen = false;
    this.hoveringMenu = false;
    this.hide();
  }

  onTriggerPointerDown(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragStarted = true;
    this.isDragging = false;
    this.dragStartCoord = this.getDragCoordinate(event);
    this.hoveringMenu = true;
    this.visible.set(true);
    this.selectAxis();

    document.addEventListener('pointermove', this.handleDragMove);
    document.addEventListener('pointerup', this.handleDragEnd);
    document.addEventListener('pointercancel', this.handleDragEnd);
  }

  setTableBorderColor(color: string | null): void {
    const table = this.hoveredTable;

    if (!table) {
      return;
    }

    this.tableBorderColor.set(color);
    this.borderColorControl.setValue(borderColorToColorName(color), { emitEvent: false });

    const current = getTableBorderColor(this.editor(), table);

    if (current !== color) {
      applyTableBorderColor(this.editor(), table, color);
      return;
    }

    syncTableBorderColorDom(table, color);
  }

  ngOnInit(): void {
    const editor = this.editor();
    const scrollContainer = editor.view.dom.parentElement;

    scrollContainer?.addEventListener('mousemove', this.handleMouseMove, true);
    scrollContainer?.addEventListener('mouseleave', this.handleContainerMouseLeave);
    scrollContainer?.addEventListener('scroll', this.handleScroll, { passive: true });
    editor.on('update', this.handleEditorUpdate);

    this.removeListeners = () => {
      scrollContainer?.removeEventListener('mousemove', this.handleMouseMove, true);
      scrollContainer?.removeEventListener('mouseleave', this.handleContainerMouseLeave);
      scrollContainer?.removeEventListener('scroll', this.handleScroll);
      editor.off('update', this.handleEditorUpdate);
      this.removeDragListeners();
    };
  }

  ngOnDestroy(): void {
    this.removeListeners?.();
  }
}
