import { effect } from '@angular/core';
import { delay } from '@koalarx/utils/KlDelay';
import { Select } from '../select';

export function isLoadingFeedback(component: Select) {
  effect(async () => {
    const isLoading = component.isLoading();

    if (!isLoading) {
      while (!component.selectField()) {
        await delay(50);
      }

      const selectedContent = component.selectElement.querySelector(
        '.selectcontent'
      ) as HTMLElement;

      selectedContent.style.opacity = '0';

      if (!component.disabled()) {
        component.isDisabled.set(false);
      }

      await delay(1);

      selectedContent.style.opacity = '1';
    } else {
      component.isDisabled.set(true);
    }
  });
}
