import { Component, effect, ElementRef, input, OnInit, signal, viewChild } from '@angular/core';
import { Editor } from '@tiptap/core';
import { EditorState, NodeSelection } from '@tiptap/pm/state';
import { cellAround, CellSelection } from '@tiptap/pm/tables';
import { EditorView } from '@tiptap/pm/view';

interface SelectionPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-text-editor-table-selection-overlay',
  templateUrl: './table-selection-overlay.html',
  host: { class: 'absolute inset-0 pointer-events-none' },
})
export class TableSelectionOverlay implements OnInit {
  private readonly tableSelectionOverlay =
    viewChild<ElementRef<HTMLDivElement>>('tableSelectionOverlay');

  readonly editor = input.required<Editor>();
  readonly clickTriggered = input.required<boolean>();
  readonly showOverlay = signal(false);

  private updateSelectionPosition(position: SelectionPosition) {
    const tableSelectionOverlay = this.tableSelectionOverlay();

    if (!tableSelectionOverlay) {
      return;
    }

    tableSelectionOverlay.nativeElement.style.top = `${position.top}px`;
    tableSelectionOverlay.nativeElement.style.left = `${position.left}px`;
    tableSelectionOverlay.nativeElement.style.width = `${position.width}px`;
    tableSelectionOverlay.nativeElement.style.height = `${position.height}px`;
  }

  private isCellNode(node: { type: { spec: Record<string, unknown> } }) {
    const role = node.type.spec['tableRole'];
    return role === 'cell' || role === 'header_cell';
  }

  private getActiveCellDOM(state: EditorState, view: EditorView): HTMLElement | null {
    const { selection } = state;

    if (selection instanceof CellSelection) {
      return view.nodeDOM(selection.$anchorCell.pos) as HTMLElement;
    }

    if (selection instanceof NodeSelection && this.isCellNode(selection.node)) {
      return view.nodeDOM(selection.from) as HTMLElement;
    }

    const $cell = cellAround(selection.$head);
    if ($cell) {
      return view.nodeDOM($cell.pos) as HTMLElement;
    }

    return null;
  }

  private getSelectionRects(state: EditorState, view: EditorView): DOMRect[] {
    const { selection } = state;
    const rects: DOMRect[] = [];

    if (selection instanceof CellSelection) {
      selection.forEachCell((_, pos) => {
        const dom = view.nodeDOM(pos) as HTMLElement | null;
        if (dom) {
          rects.push(dom.getBoundingClientRect());
        }
      });
      return rects;
    }

    const cellDOM = this.getActiveCellDOM(state, view);
    return cellDOM ? [cellDOM.getBoundingClientRect()] : [];
  }

  private mergeRects(rects: DOMRect[]): SelectionPosition {
    const top = Math.min(...rects.map((rect) => rect.top));
    const left = Math.min(...rects.map((rect) => rect.left));
    const right = Math.max(...rects.map((rect) => rect.right));
    const bottom = Math.max(...rects.map((rect) => rect.bottom));

    return {
      top,
      left,
      width: right - left,
      height: bottom - top,
    };
  }

  private updateOverlayPosition() {
    const editor = this.editor();
    const { state, view } = editor;

    if (!editor.isActive('table')) {
      this.showOverlay.set(false);
      return;
    }

    const rects = this.getSelectionRects(state, view);

    if (!rects.length) {
      this.showOverlay.set(false);
      return;
    }

    const merged = this.mergeRects(rects);
    const scrollContainer = view.dom.parentElement;

    if (!scrollContainer) {
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();

    this.updateSelectionPosition({
      top: merged.top - containerRect.top + scrollContainer.scrollTop,
      left: merged.left - containerRect.left + scrollContainer.scrollLeft,
      width: merged.width,
      height: merged.height,
    });

    this.showOverlay.set(true);
  }

  constructor() {
    effect(() => {
      if (this.clickTriggered()) {
        this.updateOverlayPosition();
      }
    });
  }

  ngOnInit(): void {
    const editor = this.editor();
    const scrollContainer = editor.view.dom.parentElement;

    editor.on('selectionUpdate', () => this.updateOverlayPosition());

    scrollContainer?.addEventListener('scroll', () => this.updateOverlayPosition(), {
      passive: true,
    });
  }
}
