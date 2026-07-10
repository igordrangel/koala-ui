import { Component, signal } from '@angular/core';
import { CanCommands } from '@tiptap/core';
import { ToolMenu, ToolMenuItem } from '../common/tool-menu';
import { ToolBase } from '../common/tool.base';

type HeadingLevel = 1 | 2 | 3 | 4;

@Component({
  selector: 'app-text-editor-tool-heading',
  template: `<app-text-editor-tool-menu
    iconClass="fa-solid fa-heading text-base"
    tooltip="Cabeçalho"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    [options]="levels()"
    (action)="toggleHeading($event.value)"
  />`,
  imports: [ToolMenu],
})
export class Heading extends ToolBase {
  activeName = 'heading';

  protected checkCanToggle(commands: CanCommands): boolean {
    return this.levels().some((item) => commands.setHeading({ level: item.value }));
  }

  protected checkIsActive(): boolean {
    this.levels.update((levels) =>
      levels.map((item) => ({
        ...item,
        isActive: this.editor().isActive(this.activeName, { level: item.value }),
      })),
    );

    return this.levels().some((item) => item.isActive);
  }

  readonly levels = signal<ToolMenuItem<HeadingLevel>[]>([
    {
      value: 1,
      name: 'Cabeçalho 1',
      icon: 'app-icon heading-h1',
      isActive: false,
      className: 'text-2xl',
    },
    {
      value: 2,
      name: 'Cabeçalho 2',
      icon: 'app-icon heading-h2',
      isActive: false,
      className: 'text-xl',
    },
    {
      value: 3,
      name: 'Cabeçalho 3',
      icon: 'app-icon heading-h3',
      isActive: false,
      className: 'text-lg',
    },
    {
      value: 4,
      name: 'Cabeçalho 4',
      icon: 'app-icon heading-h4',
      isActive: false,
      className: 'text-base',
    },
  ]);

  toggleHeading(level: HeadingLevel) {
    this.editor().chain().focus().toggleHeading({ level }).run();
  }
}
