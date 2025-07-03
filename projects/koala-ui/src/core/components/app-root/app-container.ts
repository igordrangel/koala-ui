import { Component, input } from '@angular/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { DialogContainer } from '../dialog/dialog-container';
import { LoaderPageContent } from '../loader-page/loader-page-content';
import { SideWindowContainer } from '../side-window/side-window-container';
import { SnackbarContainer } from '../snackbar/snackbar-container';

@Component({
  selector: 'kl-app-container',
  templateUrl: './app-container.html',
  imports: [
    DialogContainer,
    LoadingBarRouterModule,
    SideWindowContainer,
    SnackbarContainer,
    LoaderPageContent,
  ],
})
export class AppContainer {
  routerLoaderColor = input<string>('#6A1B9A');
}
