import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-align-justify',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-align-justify text-base"
    tooltip="Justificar"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleAlignJustify()"
  />`,
  imports: [ToolButton],
})
export class AlignJustify extends ToolBase {
  readonly activeName = 'alignJustify';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setTextAlign('justify');
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive({ textAlign: 'justify' });
  }

  toggleAlignJustify() {
    this.editor().chain().focus().setTextAlign('justify').run();
  }
}
