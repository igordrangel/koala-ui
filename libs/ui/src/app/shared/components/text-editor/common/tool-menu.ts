import { booleanAttribute, Component, input, output } from '@angular/core';
import { Editor } from '@tiptap/core';
import { Dropdown } from '../../dropdown';
import { Tooltip } from '../../tooltip';

export type ToolMenuItem<TValue = any> = {
  value: TValue;
  name: string;
  icon: string;
  isActive: boolean;
  className?: string;
};

@Component({
  selector: 'app-text-editor-tool-menu',
  templateUrl: './tool-menu.html',
  imports: [Dropdown, Tooltip],
})
export class ToolMenu {
  readonly editor = input.required<Editor>();
  readonly iconClass = input.required<string>();
  readonly tooltip = input.required<string>();
  readonly activeName = input.required<string>();
  readonly options = input.required<ToolMenuItem[]>();
  readonly canToggle = input(false, { transform: booleanAttribute });
  readonly isActive = input(false, { transform: booleanAttribute });
  readonly action = output<ToolMenuItem>();
}
