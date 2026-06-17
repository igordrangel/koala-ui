import { accessibilitySelectOptionsOnKeyDown } from '@/shared/utils/accessibility-select-options-on-keydown';
import { DestroyRef, Signal } from '@angular/core';
import { onKeyUp } from './on-keyup';

export function handleAccessibility(
  inputElement: HTMLInputElement,
  optionsElement: HTMLDivElement,
  openOptions: () => boolean,
  editLastOption: () => void,
  removeLastOption: () => void,
  filter: Signal<string>,
  destroyRef: DestroyRef,
) {
  const onKeyUpHandler = onKeyUp(filter, optionsElement, editLastOption, removeLastOption);
  const onKeyDownHandler = accessibilitySelectOptionsOnKeyDown(optionsElement, openOptions);

  inputElement.addEventListener('keyup', onKeyUpHandler);
  inputElement.addEventListener('keydown', onKeyDownHandler);

  destroyRef.onDestroy(() => {
    inputElement.removeEventListener('keyup', onKeyUpHandler);
    inputElement.removeEventListener('keydown', onKeyDownHandler);
  });
}
