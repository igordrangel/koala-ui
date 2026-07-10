import { booleanAttribute, Component, input, output } from '@angular/core';
import { Editor } from '@tiptap/core';
import { Tooltip } from '../../tooltip';

@Component({
  selector: 'app-text-editor-tool-button',
  templateUrl: './tool-button.html',
  imports: [Tooltip],
})
export class ToolButton {
  readonly editor = input.required<Editor>();
  readonly iconClass = input.required<string>();
  readonly tooltip = input.required<string>();
  readonly activeName = input.required<string>();
  readonly canToggle = input(false, { transform: booleanAttribute });
  readonly isActive = input(false, { transform: booleanAttribute });
  readonly action = output<void>();
}
