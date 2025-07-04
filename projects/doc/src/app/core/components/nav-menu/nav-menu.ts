import { Component } from '@angular/core';
import { VerticalMenuContainer } from '@koalarx/ui/core/components/vertical-menu/vertical-menu-container';
import { VerticalMenuItem } from '@koalarx/ui/core/components/vertical-menu/vertical-menu-item';
import { KlArray } from '@koalarx/utils/KlArray';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.html',
  imports: [VerticalMenuContainer, VerticalMenuItem],
})
export class NavMenu {
  items = [
    {
      module: 'Get Started',
      items: [
        {
          label: 'Introduction',
          link: '/docs/introduction',
        },
        {
          label: 'Installation',
          link: '/docs/installation',
        },
      ],
    },
    {
      module: 'Components',
      items: new KlArray([
        {
          label: 'Dialog',
          link: '/docs/components/dialog',
        },
        {
          label: 'Snackbar',
          link: '/docs/components/snackbar',
        },
        {
          label: 'SideWindow',
          link: '/docs/components/side-window',
        },
        {
          label: 'Loader Page',
          link: '/docs/components/loader-page',
        },
        {
          label: 'Loader',
          link: '/docs/components/loader',
        },
        {
          label: 'Menu',
          link: '/docs/components/menu',
        },
      ]).orderBy('label'),
    },
  ];
}
