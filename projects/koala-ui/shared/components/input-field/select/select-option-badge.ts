import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kl-select-option-badge',
  templateUrl: './select-option-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionBadge {
  removeCallback: (event: MouseEvent) => void = () => {
    throw new Error('Remove callback not set');
  };
}
