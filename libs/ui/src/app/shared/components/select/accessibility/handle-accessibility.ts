import { DestroyRef } from '@angular/core';
import { onClick } from './on-click';
import { onKeyUp } from './on-keyup';
import { accessibilitySelectOptionsOnKeyDown } from '@/shared/utils/accessibility-select-options-on-keydown';

export function handleAccessibility(
  triggerElement: HTMLElement,
  optionsElement: HTMLDivElement,
  destroyRef: DestroyRef,
) {
  const onKeyDownHandler = accessibilitySelectOptionsOnKeyDown(optionsElement);
  const onKeyUpHandler = onKeyUp(optionsElement);
  const onClickTriggerHandler = onClick(optionsElement);

  triggerElement.addEventListener('keydown', onKeyDownHandler);
  triggerElement.addEventListener('keyup', onKeyUpHandler);
  triggerElement.addEventListener('click', onClickTriggerHandler);

  destroyRef.onDestroy(() => {
    triggerElement.removeEventListener('keydown', onKeyDownHandler);
    triggerElement.removeEventListener('keyup', onKeyUpHandler);
    triggerElement.removeEventListener('click', onClickTriggerHandler);
  });
}
