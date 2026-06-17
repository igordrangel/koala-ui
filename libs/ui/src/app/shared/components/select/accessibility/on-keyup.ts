import { scrollIntoView } from '@/shared/utils/scroll-into-view';

export function onKeyUp(optionsElement: HTMLDivElement) {
  return (event: KeyboardEvent) => {
    const focusedOption: HTMLElement | null =
      optionsElement.querySelector('li[data-active="true"]');

    switch (event.key) {
      case 'Enter':
        const isOpened = focusedOption?.parentElement?.classList.contains('opened') ?? false;

        if (focusedOption && isOpened) {
          focusedOption.click();
        }
        break;
    }

    if (focusedOption) {
      focusedOption.dataset['active'] = 'true';
      scrollIntoView(focusedOption);
    }
  };
}
