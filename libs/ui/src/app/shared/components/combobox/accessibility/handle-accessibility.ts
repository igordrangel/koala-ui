import { accessibilitySelectOptionsOnKeyDown } from '@/shared/utils/accessibility-select-options-on-keydown';
import { DestroyRef, Signal } from '@angular/core';
import { onClick } from './on-click';
import { onKeyUp } from './on-keyup';

export function handleAccessibility(
  inputElement: HTMLInputElement,
  optionsElement: HTMLDivElement,
  selectedElement: HTMLElement,
  openOptions: () => boolean,
  removeLastSelected: () => void,
  filter: Signal<string>,
  destroyRef: DestroyRef,
) {
  const onKeyUpHandler = onKeyUp(optionsElement, filter, removeLastSelected);
  const onKeyDownHandler = accessibilitySelectOptionsOnKeyDown(optionsElement, openOptions);

  const onClickTriggerHandler = onClick(optionsElement, 'trigger');
  const onClickSelectedHandler = onClick(optionsElement, 'selected');

  inputElement.addEventListener('keyup', onKeyUpHandler);
  inputElement.addEventListener('keydown', onKeyDownHandler);

  inputElement.addEventListener('click', onClickTriggerHandler);

  selectedElement.addEventListener('click', onClickSelectedHandler);

  destroyRef.onDestroy(() => {
    inputElement.removeEventListener('keyup', onKeyUpHandler);
    inputElement.removeEventListener('keydown', onKeyDownHandler);

    inputElement.removeEventListener('click', onClickTriggerHandler);

    selectedElement.removeEventListener('click', onClickSelectedHandler);
  });
}
