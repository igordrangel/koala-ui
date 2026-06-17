import { scrollIntoView } from '@/shared/utils/scroll-into-view';

export function onClick(optionsElement: HTMLDivElement | HTMLElement) {
  return () => {
    const selectedOptions = optionsElement.querySelectorAll<HTMLElement>(
      'li[data-selected="true"]',
    );
    const focusedOption =
      selectedOptions.item(0) ??
      optionsElement.querySelector<HTMLElement>('li[data-active="true"]');

    if (focusedOption) {
      scrollIntoView(focusedOption);
    }
  };
}
