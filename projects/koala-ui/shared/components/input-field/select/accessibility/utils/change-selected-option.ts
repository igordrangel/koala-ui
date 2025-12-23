import { Select } from '../../select';
import { SelectExperimental } from '../../select-experimental';
import { ScrollDirection } from './update-scroll-position';

export function changeSelectedOption(
  component: Select | SelectExperimental,
  direction: ScrollDirection = 'down'
) {
  if (!component.selectElement.classList.contains('opened')) {
    return;
  }

  const options: NodeListOf<HTMLOptionElement | HTMLLabelElement> =
    component.selectElement.querySelectorAll(
      'option, .kl-select-options-content .kl-select-option-content'
    );

  const selectedOption: HTMLOptionElement | HTMLLabelElement =
    component.selectElement.querySelector('option:checked') ??
    component.selectElement.querySelector(
      'label.kl-select-option-content:has(input:checked)'
    )!;

  let newIndex = 0;

  if (selectedOption) {
    const currentIndex = Array.from(options).indexOf(selectedOption);

    if (direction === 'down') {
      newIndex =
        currentIndex + 1 < options.length ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    }
  }

  const option = options[newIndex];
  const event = new Event('change', { bubbles: true });

  if (option instanceof HTMLOptionElement) {
    option.selected = true;

    component.selectElement.dispatchEvent(event);
  } else {
    option.querySelector('input')!.checked = true;

    options.forEach((opt) => opt.classList.remove('active'));
    option.classList.toggle('active');

    option.querySelector('input')!.dispatchEvent(event);
  }
}
