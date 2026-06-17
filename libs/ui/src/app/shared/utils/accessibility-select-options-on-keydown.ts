import { scrollIntoView } from '@/shared/utils/scroll-into-view';

export function accessibilitySelectOptionsOnKeyDown(
  optionsElement: HTMLDivElement,
  openOptions: () => boolean = () => true,
) {
  return (event: KeyboardEvent) => {
    let focusedOption: HTMLElement | null = optionsElement.querySelector('li[data-active="true"]');

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();

        let previousOption: HTMLLIElement = focusedOption?.previousElementSibling as HTMLLIElement;

        if (!previousOption) {
          const optionList = optionsElement.querySelectorAll('li');
          previousOption = optionList.item(optionList.length - 1) as HTMLLIElement;
        }

        optionsElement
          .querySelectorAll('li')
          .forEach((option) => (option.dataset['active'] = 'false'));

        focusedOption = previousOption;
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();

        const alreadyVisible = openOptions();

        let nextOption: HTMLLIElement | null = alreadyVisible
          ? (focusedOption?.nextElementSibling as HTMLLIElement)
          : null;

        if (!nextOption) {
          nextOption = optionsElement.querySelector('li')!;
        }

        optionsElement
          .querySelectorAll('li')
          .forEach((option) => (option.dataset['active'] = 'false'));

        focusedOption = nextOption;
        break;
      }
      case 'Enter': {
        break;
      }
      default: {
        focusedOption = optionsElement.querySelector('li');
        break;
      }
    }

    if (focusedOption) {
      focusedOption.dataset['active'] = 'true';
      scrollIntoView(focusedOption);
    }
  };
}
