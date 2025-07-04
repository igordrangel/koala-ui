import { Component, input } from '@angular/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { DialogContainer } from '../dialog/dialog-container';
import { LoaderPageContent } from '../loader-page/loader-page-content';
import { SideWindowContainer } from '../side-window/side-window-container';
import { SnackbarContainer } from '../snackbar/snackbar-container';

@Component({
  selector: 'kl-root',
  templateUrl: './kl-root.html',
  imports: [
    DialogContainer,
    LoadingBarRouterModule,
    SideWindowContainer,
    SnackbarContainer,
    LoaderPageContent,
  ],
})
export class KlRoot {
  routerLoaderColor = input<string>('#6A1B9A');
}
