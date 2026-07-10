import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-code',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-code text-base"
    tooltip="Código"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleCode()"
  />`,
  imports: [ToolButton],
})
export class Code extends ToolBase {
  readonly activeName = 'code';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setCode();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  toggleCode() {
    this.editor().chain().focus().toggleCode().run();
  }
}
