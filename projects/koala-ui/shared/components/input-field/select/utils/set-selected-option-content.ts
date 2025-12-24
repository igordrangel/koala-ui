import { createComponent } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isEmpty } from '@koalarx/ui/shared/utils';
import { delay } from '@koalarx/utils/KlDelay';
import { Select } from '../select';
import { SelectOptionBadge } from '../select-option-badge';

function hasValue(value: any) {
  return Array.isArray(value) ? value.length > 0 : !isEmpty(value);
}

function createBadgeElement(component: Select, content: Node, value: any) {
  const badgeComponent = createComponent(SelectOptionBadge, {
    environmentInjector: component.appRef.injector,
    projectableNodes: [[content]],
  });

  badgeComponent.instance.removeCallback = (event: MouseEvent) =>
    component.removeOption(event);

  const element: HTMLElement = badgeComponent.location.nativeElement;
  const spanElement = element.firstElementChild as HTMLSpanElement;

  spanElement.dataset['value'] = value;

  return element;
}

async function appendSelectedOptionContent(component: Select, value: any) {
  while (component.isLoading()) {
    await delay(50);
  }

  const selectedContent = component.selectElement.querySelector(
    '.selectcontent'
  ) as HTMLElement;

  if (!Array.isArray(value)) {
    value = [value];
  }

  selectedContent.innerHTML = '';

  for (const v of value) {
    const selectedIndex = component
      .optionList()
      .findIndex((item) => item.value === v);

    const selectedOptions = component.selectElement.querySelector(
      `.kl-select-option-content[data-index="${selectedIndex}"] span span`
    ) as HTMLSpanElement;

    if (selectedOptions) {
      const optionContent = selectedOptions.cloneNode(true);
      const optionBadge = component.multiple()
        ? createBadgeElement(component, optionContent, v)
        : optionContent;

      selectedContent.appendChild(optionBadge);
    }
  }

  component.hasValue.set(hasValue(value));
}

export function setSelectedOptionContent(component: Select) {
  appendSelectedOptionContent(component, component.control().value);

  component.hasValue.set(hasValue(component.control().value));

  component
    .control()
    .valueChanges.pipe(takeUntilDestroyed(component.destroyRef))
    .subscribe((value) => appendSelectedOptionContent(component, value));
}
