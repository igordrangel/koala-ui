import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-undo',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-undo text-base"
    tooltip="Desfazer"
    [activeName]="activeName"
    [editor]="editor()"
    [canToggle]="canToggle()"
    (action)="undo()"
  />`,
  imports: [ToolButton],
})
export class Undo extends ToolBase {
  readonly activeName = 'undo';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.undo();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  undo() {
    this.editor().chain().focus().undo().run();
  }
}
