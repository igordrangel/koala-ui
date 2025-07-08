import { Component, inject } from '@angular/core';
import { Loader } from '../loader';
import { LoaderPage } from '.';

@Component({
  selector: 'kl-loader-page-content',
  templateUrl: './loader-page-content.html',
  imports: [Loader],
})
export class LoaderPageContent {
  loaderPage = inject(LoaderPage);
}
