import { effect } from '@angular/core';
import { delay } from '@koalarx/utils/KlDelay';
import { Select } from '../select';

export function ajustFilteredValueOnSelect(component: Select) {
  effect(async () => {
    const isLoading = component.isLoading();

    if (!isLoading) {
      const selectedContent = component.selectElement.querySelector(
        'selectedcontent'
      ) as HTMLElement;

      selectedContent.style.opacity = '0';

      const selectedValue = component.control().value;
      const selectedIndex = component
        .optionList()
        .findIndex((item) => item.value === selectedValue);

      if (!component.disabled()) {
        component.isDisabled.set(false);
      }

      await delay(1);

      selectedContent.style.opacity = '1';
      component.selectElement.selectedIndex = selectedIndex;
      component.selectElement.value = selectedValue;
    } else {
      component.isDisabled.set(true);
    }
  });
}
