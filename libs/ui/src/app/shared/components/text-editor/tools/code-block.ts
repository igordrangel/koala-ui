import { Component } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolButton } from '../common/tool-button';
import { ToolBase } from '../common/tool.base';

@Component({
  selector: 'app-text-editor-tool-code-block',
  template: `<app-text-editor-tool-button
    iconClass="app-icon code-block size-5!"
    tooltip="Bloco de código"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    (action)="toggleCodeBlock()"
  />`,
  imports: [ToolButton],
})
export class CodeBlock extends ToolBase {
  readonly activeName = 'codeBlock';

  protected checkCanToggle(commands: CanCommands): boolean {
    return commands.setCodeBlock();
  }

  protected checkIsActive(): boolean {
    return this.editor().isActive(this.activeName);
  }

  toggleCodeBlock() {
    this.editor().chain().focus().toggleCodeBlock().run();
  }
}
