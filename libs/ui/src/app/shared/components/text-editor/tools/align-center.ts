import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-align-center',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-align-center text-base"
    tooltip="Alinhar ao centro"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleAlignCenter()"
  />`,
  imports: [ToolButton],
})
export class AlignCenter extends ToolBase {
  readonly activeName = 'alignCenter';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setTextAlign('center');
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive({ textAlign: 'center' });
  }

  toggleAlignCenter() {
    this.editor().chain().focus().setTextAlign('center').run();
  }
}
