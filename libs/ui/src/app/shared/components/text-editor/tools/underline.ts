import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-underline',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-underline text-base"
    tooltip="Sublinhado"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleUnderline()"
  />`,
  imports: [ToolButton],
})
export class Underline extends ToolBase {
  readonly activeName = 'underline';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setUnderline();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  toggleUnderline() {
    this.editor().chain().focus().toggleUnderline().run();
  }
}
