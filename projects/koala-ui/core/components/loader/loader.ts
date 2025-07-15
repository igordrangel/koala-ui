import { Component, input } from '@angular/core';

type LoaderSize = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

@Component({
  selector: 'kl-loader',
  templateUrl: './loader.html',
})
export class Loader {
  size = input<LoaderSize>('small');
}
