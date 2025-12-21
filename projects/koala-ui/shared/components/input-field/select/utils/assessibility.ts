import { Select } from '../select';

type Direction = 'down' | 'up';

function updateScrollPosition(
  component: Select,
  direction: Direction = 'down'
) {
  setTimeout(() => {
    const optionsContainer = component.selectElement.querySelector(
      '.kl-select-options-content'
    ) as HTMLDivElement;
    const focusedOptionElement = optionsContainer.querySelector(
      'option:checked'
    ) as HTMLDivElement;

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

function changeSelectedOption(
  component: Select,
  direction: Direction = 'down'
) {
  const options = component.selectElement.querySelectorAll(
    'option'
  ) as NodeListOf<HTMLOptionElement>;
  const selectedOption = component.selectElement.querySelector(
    'option:checked'
  ) as HTMLOptionElement;

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

  options[newIndex].selected = true;

  const event = new Event('change', { bubbles: true });
  component.selectElement.dispatchEvent(event);
}

export function assessibility(component: Select) {
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
