import { Select } from '../select';
import { initOnKeyDownListener } from './on-keydown';

export function assessibility(component: Select) {
  initOnKeyDownListener(component);
}
