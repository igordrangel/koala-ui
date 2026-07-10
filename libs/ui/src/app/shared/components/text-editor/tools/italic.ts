import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-italic',
  template: `<app-text-editor-tool-button
    iconClass="fa-solid fa-italic text-base"
    tooltip="Itálico"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleItalic()"
  />`,
  imports: [ToolButton],
})
export class Italic extends ToolBase {
  readonly activeName = 'italic';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setItalic();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  toggleItalic() {
    this.editor().chain().focus().toggleItalic().run();
  }
}
