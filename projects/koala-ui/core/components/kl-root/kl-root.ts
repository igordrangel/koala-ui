import { Component, input, OnInit } from '@angular/core';
import { DialogContainer } from '@koalarx/ui/core/components/dialog';
import { LoaderPageContent } from '@koalarx/ui/core/components/loader-page';
import { SideWindowContainer } from '@koalarx/ui/core/components/side-window';
import { SnackbarContainer } from '@koalarx/ui/core/components/snackbar';
import { ThemeName } from '@koalarx/ui/theme';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { CURRENT_THEME } from '../../config';

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
export class KlRoot implements OnInit {
  routerLoaderColor = input<string>('#6A1B9A');

  ngOnInit(): void {
    if (document.querySelector('html')?.getAttribute('data-theme') === null) {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    }

    const htmlElement = document.querySelector('html');

    if (htmlElement) {
      htmlElement.onchange = () => {
        setTimeout(() => {
          const theme = htmlElement.getAttribute(
            'data-theme'
          ) as ThemeName | null;

          if (theme === CURRENT_THEME()) {
            return;
          }

          CURRENT_THEME.set(theme);
        });
      };
    }
  }
}
