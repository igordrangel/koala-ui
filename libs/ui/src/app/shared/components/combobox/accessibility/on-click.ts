import { scrollIntoView } from '@/shared/utils/scroll-into-view';

export function onClick(
  optionsElement: HTMLDivElement | HTMLElement,
  type: 'selected' | 'trigger',
) {
  return () => {
    switch (type) {
      case 'selected': {
        const selectedOptions = optionsElement.querySelectorAll('li[data-selected="true"]');

        if (selectedOptions.length === 1) {
          const selectedOptionContainer: HTMLElement | null =
            optionsElement.parentElement?.parentElement?.parentElement?.querySelector(
              '[role="selectedContent"]',
            ) ?? null;
          const inputFilterContainer: HTMLInputElement | null =
            optionsElement.parentElement?.parentElement?.parentElement?.querySelector(
              '[role="inputFilter"]',
            ) ?? null;

          if (selectedOptionContainer) {
            selectedOptionContainer.classList.add('hidden');
          }

          if (inputFilterContainer) {
            inputFilterContainer.classList.remove('hidden');

            queueMicrotask(() => {
              inputFilterContainer.click();
              inputFilterContainer.focus();
            });
          }
        }
        break;
      }
      case 'trigger': {
        const focusedOption: HTMLElement | null =
          optionsElement.querySelector('li[data-active="true"]');
        const selectedOptions = optionsElement.querySelectorAll('li[data-selected="true"]');

        if (focusedOption) {
          scrollIntoView(focusedOption);
        } else if (selectedOptions.length > 0) {
          const lastSelectedOption =
            selectedOptions[selectedOptions.length - 1]?.getAttribute('data-value');

          const selectedOption: HTMLElement | null = lastSelectedOption
            ? optionsElement.querySelector(`li[data-value="${lastSelectedOption}"]`)
            : null;

          if (selectedOption) {
            scrollIntoView(selectedOption);
            selectedOption.dataset['active'] = 'true';
          }
        } else {
          const firstOption: HTMLElement | null = optionsElement.querySelector('li');

          if (firstOption) {
            scrollIntoView(firstOption);
            firstOption.dataset['active'] = 'true';
          }
        }
      }
    }
  };
}
