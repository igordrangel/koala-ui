import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-redo',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-redo text-base"
    tooltip="Refazer"
    [activeName]="activeName"
    [editor]="editor()"
    [canToggle]="canToggle()"
    (action)="redo()"
  />`,
  imports: [ToolButton],
})
export class Redo extends ToolBase {
  readonly activeName = 'redo';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.redo();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  redo() {
    this.editor().chain().focus().redo().run();
  }
}
