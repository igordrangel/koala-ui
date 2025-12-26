import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kl-collapse',
  templateUrl: './collapse.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Collapse {}
