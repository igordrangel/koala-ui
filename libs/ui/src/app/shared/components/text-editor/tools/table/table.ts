import { Component, signal, viewChild } from '@angular/core';
import { Dropdown, DropdownContainer } from '../../../dropdown';
import { ToolBase } from '../../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-table',
  template: `<app-dropdown #tableMenu insideClick>
    <button
      trigger
      class="btn btn-xs size-9! px-6! rounded-xl hover:dark:bg-neutral-900! hover:bg-neutral-100!"
      type="button"
      [class.btn-primary]="isActive()"
      [class.btn-ghost]="!isActive()"
      [class.btn-soft]="isActive()"
      appTooltip="Cabeçalho"
      [disabled]="!canToggle()"
    >
      <i class="fa-solid fa-table text-base" [class.opacity-70!]="!isActive()"></i>
      <i class="fa-solid fa-angle-down text-[0.6rem]" [class.opacity-70!]="!isActive()"></i>
    </button>

    <div class="p-2" options>
      <div class="grid grid-cols-8 grid-rows-8 gap-1 mb-2">
        @for (row of rows; track $index) {
          @for (cell of cols; track $index) {
            <div
              class="w-full h-5 border border-base-300 bg-base-200 rounded aspect-square cursor-pointer"
              [class.border-primary]="isHighlighted(row, cell)"
              [class.bg-primary/40]="isHighlighted(row, cell)"
              (mousemove)="tableMatrix.set({ rows: row, cols: cell })"
              (click)="insertTable()"
            ></div>
          }
        }
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center border border-base-300 py-2 px-3 rounded-xl">
          <i class="app-icon grid-col opacity-70 text-lg"></i>
          <span class="p-1 w-10 text-center">{{ tableMatrix().cols }}</span>
        </div>

        <span class="text-xs opacity-70 px-1">X</span>

        <div class="flex items-center border border-base-300 py-2 px-3 rounded-xl">
          <i class="app-icon grid-row opacity-70 text-lg"></i>
          <span class="p-1 w-10 text-center">{{ tableMatrix().rows }}</span>
        </div>
      </div>
    </div>
  </app-dropdown>`,
  imports: [Dropdown],
})
export class Table extends ToolBase {
  private readonly tableMenu = viewChild<DropdownContainer>('tableMenu');

  protected readonly rows = Array.from({ length: 8 }, (_, i) => i + 1);
  protected readonly cols = Array.from({ length: 8 }, (_, i) => i + 1);

  readonly activeName = 'table';
  readonly tableMatrix = signal({ rows: 0, cols: 0 });

  protected override checkCanToggle(): boolean {
    return true;
  }

  protected override checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  isHighlighted(row: number, cell: number) {
    return row <= this.tableMatrix().rows && cell <= this.tableMatrix().cols;
  }

  insertTable() {
    this.tableMenu()?.close();

    const { rows, cols } = this.tableMatrix();

    this.editor().chain().focus().insertTable({ rows, cols }).run();

    this.tableMatrix.set({ rows: 0, cols: 0 });
  }
}
