import { Component, input } from '@angular/core';

type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'kl-loader',
  templateUrl: './loader.html',
})
export class Loader {
  size = input<LoaderSize>('sm');
}
