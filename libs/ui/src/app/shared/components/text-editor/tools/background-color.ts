import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '@/shared/components/input-color';
import { Dropdown } from '../../dropdown';
import { Tooltip } from '../../tooltip';
import { ColorToolBase } from '../common/color-tool.base';

@Component({
  selector: 'app-text-editor-tool-background-color',
  template: `<app-dropdown insideClick>
    <button
      trigger
      class="btn btn-xs size-9! rounded-xl hover:dark:bg-neutral-900! hover:bg-neutral-100!"
      type="button"
      appTooltip="Cor de fundo"
      [class.btn-primary]="isActive()"
      [class.btn-ghost]="!isActive()"
      [class.btn-soft]="isActive()"
      [disabled]="!canToggle()"
    >
      <span class="flex flex-col items-center gap-1.5">
        <i class="fa-solid fa-fill-drip text-base" [class.opacity-70!]="!isActive()"></i>
        @if (indicatorColor(); as color) {
          <span class="block h-1 w-5 rounded-full" [class]="color.bgClass"></span>
        }
      </span>
    </button>

    <div class="p-2 w-64" options>
      <app-input-color
        placeholder="Cor de fundo"
        clearable
        [formControl]="colorControl"
        [syncColorName]="colorSync()"
        (colorPicked)="onColorPicked($event)"
      />
    </div>
  </app-dropdown>`,
  imports: [Dropdown, Tooltip, InputColor, ReactiveFormsModule],
})
export class BackgroundColor extends ColorToolBase {
  readonly markName = 'textBackgroundColor';
}
