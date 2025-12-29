import { createComponent } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isEmpty } from '@koalarx/ui/shared/utils';
import { delay } from '@koalarx/utils/KlDelay';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
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
    value = isEmpty(value) ? [] : [value];
  }

  if (!component.multiple()) {
    selectedContent.innerHTML = '';
  }

  selectedContent
    .querySelectorAll<HTMLSpanElement>('span[data-value]')
    .forEach((node) => {
      if (!value.map(String).includes(node.dataset['value'])) {
        node.parentElement!.remove();
      }
    });

  for (const v of value) {
    const optionData = component
      .selectedOptions()
      .find((item) => String(item.value) === String(v));

    if (!optionData) {
      continue;
    }

    const optionContent = document.createElement('span');
    optionContent.dataset['value'] = String(v);
    optionContent.innerHTML = optionData?.label ?? v;

    if (selectedContent.querySelector(`[data-value="${v}"]`)) {
      continue;
    }

    const optionBadge = component.multiple()
      ? createBadgeElement(component, optionContent, v)
      : optionContent;

    selectedContent.appendChild(optionBadge);
  }

  component.hasValue.set(hasValue(value));

  component.selectElement
    .querySelectorAll<HTMLInputElement>('input[type=checkbox]')
    .forEach((input) => {
      input.checked = value.map(String).includes(input.value);
    });
}

function setSelectedOptionsOnComponent(component: Select, value: any) {
  component.selectedOptions.set(
    component
      .optionList()
      .filter((item) =>
        Array.isArray(value)
          ? value.map(String).includes(String(item.value))
          : String(item.value) === String(value)
      )
  );
}

export async function setSelectedOptionContent(component: Select) {
  const value = component.control().value;

  component.hasValue.set(hasValue(value));

  while (component.isLoading()) {
    await delay(50);
  }

  setSelectedOptionsOnComponent(component, value);

  await appendSelectedOptionContent(component, value);

  component
    .control()
    .valueChanges.pipe(
      debounceTime(50),
      takeUntilDestroyed(component.destroyRef)
    )
    .subscribe((value) => {
      setSelectedOptionsOnComponent(component, value);
      appendSelectedOptionContent(component, value);
    });
}
