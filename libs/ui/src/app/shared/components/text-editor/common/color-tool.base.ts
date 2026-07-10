import { afterRenderEffect, Directive, computed, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getColorByName } from '@/shared/components/input-color/colors';
import { ToolBase } from './tool.base';

@Directive()
export abstract class ColorToolBase extends ToolBase {
  abstract readonly markName: string;

  readonly colorControl = new FormControl<string | null>(null);
  readonly currentColorName = signal<string | null | undefined>(undefined);
  readonly colorSync = computed(() => this.currentColorName());
  readonly indicatorColor = computed(() => {
    const colorName = this.currentColorName();

    if (!colorName) {
      return null;
    }

    return getColorByName(colorName);
  });

  protected checkCanToggle(): boolean {
    return true;
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.markName);
  }

  constructor() {
    super();

    afterRenderEffect(() => {
      const syncSelection = () => {
        if (this.editor().isActive(this.markName)) {
          const attrs = this.editor().getAttributes(this.markName) as { colorName?: string | null };
          this.currentColorName.set(attrs.colorName ?? undefined);
          this.colorControl.setValue(attrs.colorName ?? null, { emitEvent: false });
          return;
        }

        this.currentColorName.set(undefined);
        this.colorControl.setValue(null, { emitEvent: false });
      };

      this.editor().on('selectionUpdate', syncSelection);
      this.editor().on('update', syncSelection);
    });
  }

  onColorPicked(colorName: string | null): void {
    if (colorName === null) {
      this.editor().chain().focus().unsetMark(this.markName).run();
      this.currentColorName.set(undefined);
      return;
    }

    this.editor().chain().focus().setMark(this.markName, { colorName }).run();
    this.currentColorName.set(colorName);
  }
}
