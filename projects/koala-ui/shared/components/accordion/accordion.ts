import { Component, input } from '@angular/core';

@Component({
  selector: 'kl-accordion',
  templateUrl: './accordion.html',
})
export class Accordion {
  name = input.required<string>();
}
