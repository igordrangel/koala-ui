import { booleanAttribute, Component, input } from '@angular/core';
import { randomString } from '@koalarx/utils';

@Component({
  selector: 'kl-tab-item',
  templateUrl: './tab-item.html',
})
export class TabItem {
  checked = input(false, { transform: booleanAttribute });
  name = randomString(10, { lowercase: true });
}
