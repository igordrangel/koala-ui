import { Select } from '../../select';
import { SelectExperimental } from '../../select-experimental';

export type ScrollDirection = 'down' | 'up';

export function updateScrollPosition(
  component: Select | SelectExperimental,
  direction: ScrollDirection = 'down'
) {
  if (!component.selectElement.classList.contains('opened')) {
    return;
  }

  setTimeout(() => {
    const optionsContainer = component.selectElement.querySelector(
      '.kl-select-options-content'
    ) as HTMLDivElement;
    const focusedOptionElement =
      optionsContainer.querySelector('option:checked') ??
      component.selectElement.querySelector(
        'label.kl-select-option-content:has(input:checked)'
      )!;

    if (focusedOptionElement) {
      optionsContainer.scrollTo({
        top:
          direction === 'down'
            ? optionsContainer.scrollTop +
              focusedOptionElement.getBoundingClientRect().height
            : optionsContainer.scrollTop -
              focusedOptionElement.getBoundingClientRect().height,
      });
    }
  }, 50);
}
