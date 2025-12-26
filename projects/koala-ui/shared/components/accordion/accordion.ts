import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'kl-accordion',
  templateUrl: './accordion.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion {
  name = input.required<string>();
}
