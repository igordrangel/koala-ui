import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-blockquote',
  template: `<app-text-editor-tool-button
    iconClass="app-icon blockquote size-5!"
    tooltip="Citação"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleBlockquote()"
  />`,
  imports: [ToolButton],
})
export class Blockquote extends ToolBase {
  readonly activeName = 'blockquote';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setBlockquote();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  toggleBlockquote() {
    this.editor().chain().focus().toggleBlockquote().run();
  }
}
