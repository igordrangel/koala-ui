import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'kl-horizontal-menu-item',
  templateUrl: './horizontal-menu-item.html',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalMenuItem {
  link = input.required<string>();
}
