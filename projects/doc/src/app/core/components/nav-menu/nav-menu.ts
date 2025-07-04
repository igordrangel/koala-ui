import { Component } from '@angular/core';
import { VerticalMenuContainer } from '@koalarx/ui/shared/components/vertical-menu/vertical-menu-container';
import { VerticalMenuItem } from '@koalarx/ui/shared/components/vertical-menu/vertical-menu-item';
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
          label: 'Code Viewer',
          link: '/docs/components/code-viewer',
        },
        {
          label: 'Toolbar',
          link: '/docs/components/toolbar',
        },
        {
          label: 'On This Page',
          link: '/docs/components/on-this-page',
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
