import { Component, signal } from '@angular/core';
import { ToolMenu, ToolMenuItem } from '../common/tool-menu';
import { ToolBase } from '../common/tool.base';

type ListType = 'orderedList' | 'bulletList';

@Component({
  selector: 'app-text-editor-tool-list',
  template: `<app-text-editor-tool-menu
    iconClass="fa-solid fa-list text-base"
    tooltip="Lista"
    [activeName]="activeName"
    [editor]="editor()"
    [isActive]="isActive()"
    [canToggle]="canToggle()"
    [options]="levels()"
    (action)="toggleList($event.value)"
  />`,
  imports: [ToolMenu],
})
export class List extends ToolBase {
  activeName = 'list';

  protected checkCanToggle(): boolean {
    return true;
  }

  protected checkIsActive(): boolean {
    this.levels.update((levels) =>
      levels.map((item) => ({
        ...item,
        isActive: this.editor().isActive(item.value),
      })),
    );

    return this.levels().some((item) => item.isActive);
  }

  readonly levels = signal<ToolMenuItem<ListType>[]>([
    {
      value: 'orderedList',
      name: 'Lista ordenada',
      icon: 'fa-solid fa-list-ol text-base',
      isActive: false,
    },
    {
      value: 'bulletList',
      name: 'Lista com marcadores',
      icon: 'fa-solid fa-list text-base',
      isActive: false,
    },
  ]);

  toggleList(type: ListType) {
    this.editor().chain().focus().toggleList(type, 'listItem').run();
  }
}
