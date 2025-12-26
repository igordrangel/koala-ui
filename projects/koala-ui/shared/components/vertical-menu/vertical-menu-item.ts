import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'kl-vertical-menu-item',
  templateUrl: './vertical-menu-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class VerticalMenuItem {
  link = input.required<string>();
}
