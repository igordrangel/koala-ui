import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-strike',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-strikethrough text-base"
    tooltip="Tachado"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleStrike()"
  />`,
  imports: [ToolButton],
})
export class Strike extends ToolBase {
  readonly activeName = 'strike';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setStrike();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  toggleStrike() {
    this.editor().chain().focus().toggleStrike().run();
  }
}
