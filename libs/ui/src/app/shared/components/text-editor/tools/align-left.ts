import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-align-left',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-align-left text-base"
    tooltip="Alinhar à esquerda"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleAlignLeft()"
  />`,
  imports: [ToolButton],
})
export class AlignLeft extends ToolBase {
  readonly activeName = 'alignLeft';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setTextAlign('left');
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive({ textAlign: 'left' });
  }

  toggleAlignLeft() {
    this.editor().chain().focus().setTextAlign('left').run();
  }
}
