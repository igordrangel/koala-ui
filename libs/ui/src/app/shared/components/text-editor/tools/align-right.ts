import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-align-right',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-align-right text-base"
    tooltip="Alinhar à direita"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleAlignRight()"
  />`,
  imports: [ToolButton],
})
export class AlignRight extends ToolBase {
  readonly activeName = 'alignRight';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setTextAlign('right');
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive({ textAlign: 'right' });
  }

  toggleAlignRight() {
    this.editor().chain().focus().setTextAlign('right').run();
  }
}
