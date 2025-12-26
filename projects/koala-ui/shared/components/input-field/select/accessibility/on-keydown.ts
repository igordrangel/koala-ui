import { Select } from '../select';
import { changeSelectedOption } from './utils/change-selected-option';
import { updateScrollPosition } from './utils/update-scroll-position';

export function initOnKeyDownListener(component: Select) {
  function onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown': {
        event.stopPropagation();
        event.preventDefault();

        changeSelectedOption(component, 'down');
        updateScrollPosition(component, 'down');
        break;
      }
      case 'ArrowUp': {
        event.stopPropagation();
        event.preventDefault();

        changeSelectedOption(component, 'up');
        updateScrollPosition(component, 'up');
        break;
      }
    }
  }

  addEventListener('keydown', onKeyDown);

  component.destroyRef.onDestroy(() => {
    removeEventListener('keydown', onKeyDown);
  });
}
