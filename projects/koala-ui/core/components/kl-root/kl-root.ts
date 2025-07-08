import { Component, input } from '@angular/core';
import { DialogContainer } from '@koalarx/ui/core/components/dialog';
import { LoaderPageContent } from '@koalarx/ui/core/components/loader-page';
import { SideWindowContainer } from '@koalarx/ui/core/components/side-window';
import { SnackbarContainer } from '@koalarx/ui/core/components/snackbar';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

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
