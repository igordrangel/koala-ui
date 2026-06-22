import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.html',
  host: { class: 'block h-full w-full min-w-0' },
  imports: [RouterLink],
})
export class ShowcaseCard {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly docLink = input<string>();
}
