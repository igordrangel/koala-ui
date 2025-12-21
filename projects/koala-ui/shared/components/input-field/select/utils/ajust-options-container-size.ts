import { afterRenderEffect } from '@angular/core';
import { Select } from '../select';

export function ajustOptionsContainerSize(component: Select) {
  afterRenderEffect(() => {
    const selectElement = component.selectElement;

    const ajustSizeOnFocus = () => {
      const optionsContainer = selectElement.parentElement?.querySelector(
        '.kl-select-options-container'
      ) as HTMLElement | null;

      if (optionsContainer) {
        const optionsTop = optionsContainer.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const availableHeight = viewportHeight - optionsTop - 16;
        optionsContainer.style.maxHeight = `${availableHeight}px`;
      }
    };

    selectElement.addEventListener('click', ajustSizeOnFocus);

    component.destroyRef.onDestroy(() => {
      selectElement.removeEventListener('click', ajustSizeOnFocus);
    });
  });
}
