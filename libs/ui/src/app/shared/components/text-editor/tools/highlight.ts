import { Component, signal } from '@angular/core';
import { Dropdown } from '../../dropdown';
import { Tooltip } from '../../tooltip';
import { ToolDivider } from '../common/tool-divider';
import { ToolBase } from '../common/tool.base';

type ListOptions = { color: string; isActive: boolean };

@Component({
  selector: 'app-text-editor-tool-highlight',
  template: `<app-dropdown>
    <button
      trigger
      class="btn btn-xs size-9! rounded-xl hover:dark:bg-neutral-900! hover:bg-neutral-100!"
      type="button"
      [class.btn-primary]="isActive()"
      [class.btn-ghost]="!isActive()"
      [class.btn-soft]="isActive()"
      appTooltip="Destacar"
      [disabled]="!canToggle()"
    >
      <i class="app-icon highlight size-6!" [class.opacity-70!]="!isActive()"></i>
    </button>

    <div class="flex items-center justify-between p-2" options>
      <div class="flex items-center gap-1">
        @for (item of colors(); track $index) {
          <a
            [id]="item.color"
            class="flex cursor-pointer p-2 rounded-xl transition-colors duration-100"
            [class.bg-base-100]="item.isActive"
            (click)="toggleList(item.color)"
          >
            <span class="size-6 rounded-full" [class]="item.color"></span>
          </a>
        }
      </div>

      <app-text-editor-tool-divider />

      <a class="btn btn-md btn-circle size-8 rounded-full" (click)="toggleList()">
        <i class="fa-solid fa-ban text-xl"></i>
      </a>
    </div>
  </app-dropdown>`,
  imports: [Dropdown, Tooltip, ToolDivider],
})
export class Highlight extends ToolBase {
  protected checkCanToggle(): boolean {
    return true;
  }

  protected checkIsActive(): boolean {
    this.colors.update((colors) =>
      colors.map((item) => ({
        ...item,
        isActive: this.editor().isActive('highlight', { color: item.color }),
      })),
    );

    return this.colors().some((item) => item.isActive);
  }

  readonly colors = signal<ListOptions[]>([
    { color: 'bg-emerald-700 text-white', isActive: false },
    { color: 'bg-slate-500 text-white', isActive: false },
    { color: 'bg-rose-900 text-white', isActive: false },
    { color: 'bg-violet-900 text-white', isActive: false },
    { color: 'bg-yellow-900 text-white', isActive: false },
  ]);

  toggleList(color?: string) {
    if (!color) {
      this.editor().chain().focus().unsetMark('highlight').run();
      return;
    }

    this.editor().chain().focus().toggleMark('highlight', { color }).run();
  }
}
