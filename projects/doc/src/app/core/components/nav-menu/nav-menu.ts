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
      module: 'Data Input',
      items: new KlArray([
        {
          label: 'Autocomplete',
          link: '/docs/data-input/autocomplete',
        },
      ]).orderBy('label'),
    },
  ];
}
