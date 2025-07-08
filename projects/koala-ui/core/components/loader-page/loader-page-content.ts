import { Component, inject } from '@angular/core';
import { Loader } from '@koalarx/ui/core/components/loader';
import { LoaderPage } from './loader-page';

@Component({
  selector: 'kl-loader-page-content',
  templateUrl: './loader-page-content.html',
  imports: [Loader],
})
export class LoaderPageContent {
  loaderPage = inject(LoaderPage);
}
