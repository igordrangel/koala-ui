import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-bold',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-bold text-base"
    tooltip="Negrito"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleBold()"
  />`,
  imports: [ToolButton],
})
export class Bold extends ToolBase {
  readonly activeName = 'bold';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setBold();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  toggleBold() {
    this.editor().chain().focus().toggleBold().run();
  }
}
