import { booleanAttribute, Component, input } from '@angular/core';

export type CollapseType = 'accordion' | 'collapse';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.html',
})
export class Collapse {
  readonly name = input<string>(`collapse-${Math.random().toString(36).substring(2)}`);
  readonly type = input<CollapseType>('collapse');
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly active = input(false, { transform: booleanAttribute });
}
