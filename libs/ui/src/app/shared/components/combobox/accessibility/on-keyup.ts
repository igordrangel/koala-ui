import { scrollIntoView } from '@/shared/utils/scroll-into-view';
import { Signal } from '@angular/core';

export function onKeyUp(
  optionsElement: HTMLDivElement,
  filter: Signal<string>,
  removeLastSelected: () => void,
) {
  let timeoutRef: NodeJS.Timeout;

  return (event: KeyboardEvent) => {
    clearTimeout(timeoutRef);

    let timeToWait = 300;
    const focusedOption: HTMLElement | null =
      optionsElement.querySelector('li[data-active="true"]');

    switch (event.key) {
      case 'Enter':
        if (focusedOption) {
          setTimeout(() => focusedOption.click());
          return;
        }
        break;
      case 'Backspace':
        if (!filter().length) {
          removeLastSelected();
        }
        timeToWait = 0;
        break;
    }

    if (focusedOption) {
      timeoutRef = setTimeout(() => {
        focusedOption.dataset['active'] = 'true';
        scrollIntoView(focusedOption);
      }, timeToWait);
    }
  };
}
