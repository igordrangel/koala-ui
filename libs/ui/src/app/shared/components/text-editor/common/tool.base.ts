import { afterRenderEffect, Directive, input, signal } from '@angular/core';
import { CanCommands, Editor } from '@tiptap/core';

@Directive()
export abstract class ToolBase {
  private readonly _canToggle = signal(false);
  private readonly _isActive = signal(false);

  protected abstract checkCanToggle(commands: CanCommands): boolean;
  protected abstract checkIsActive(commands: CanCommands): boolean;

  readonly editor = input.required<Editor>();
  readonly canToggle = this._canToggle.asReadonly();
  readonly isActive = this._isActive.asReadonly();

  private handleCanToggle() {
    this._canToggle.set(this.checkCanToggle(this.editor().can()));
  }

  private handleIsActive() {
    this._isActive.set(this.checkIsActive(this.editor().can()));
  }

  constructor() {
    afterRenderEffect((onCleanup) => {
      const editor = this.editor();
      const sync = () => {
        this.handleCanToggle();
        this.handleIsActive();
      };

      editor.on('selectionUpdate', sync);
      editor.on('update', sync);

      onCleanup(() => {
        editor.off('selectionUpdate', sync);
        editor.off('update', sync);
      });

      sync();
    });
  }
}
