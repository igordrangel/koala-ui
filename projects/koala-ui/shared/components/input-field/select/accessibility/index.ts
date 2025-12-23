import { Select } from '../select';
import { SelectExperimental } from '../select-experimental';
import { initOnKeyDownListener } from './on-keydown';

export function assessibility(component: Select | SelectExperimental) {
  initOnKeyDownListener(component);
}
