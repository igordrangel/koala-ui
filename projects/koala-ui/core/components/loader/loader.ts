import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type LoaderSize = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

@Component({
  selector: 'kl-loader',
  templateUrl: './loader.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
  size = input<LoaderSize>('small');
}
