import { Signal } from '@angular/core';

export function onKeyUp(
  filter: Signal<string>,
  optionsElement: HTMLDivElement,
  editLastOption: () => void,
  removeLastOption: () => void,
) {
  return (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft': {
        editLastOption();
        break;
      }
      case 'Enter': {
        const focusedOption: HTMLElement = optionsElement.querySelector('li[data-active="true"]')!;

        if (focusedOption) {
          setTimeout(() => focusedOption.click());
        }
        break;
      }
      case 'Backspace': {
        if (!filter().length) {
          removeLastOption();
        }
        break;
      }
    }
  };
}
