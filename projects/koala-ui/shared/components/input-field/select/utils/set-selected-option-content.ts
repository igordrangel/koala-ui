import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Select } from '../select';
import { delay } from '@koalarx/utils/KlDelay';

async function appendSelectedOptionContent(component: Select, value: any) {
  while (component.isLoading()) {
    await delay(50);
  }

  const selectedContent = component.selectElement.querySelector(
    '.selectcontent'
  ) as HTMLElement;

  const selectedIndex = component
    .optionList()
    .findIndex((item) => item.value === value);

  const selectedOption = component.selectElement.querySelector(
    `.kl-select-option-content[data-index="${selectedIndex}"] span span`
  ) as HTMLSpanElement;

  selectedContent.innerHTML = '';

  if (selectedOption) {
    selectedContent.appendChild(selectedOption.cloneNode(true));
  }
}

export function setSelectedOptionContent(component: Select) {
  appendSelectedOptionContent(component, component.control().value);

  component
    .control()
    .valueChanges.pipe(takeUntilDestroyed(component.destroyRef))
    .subscribe((value) => appendSelectedOptionContent(component, value));
}
