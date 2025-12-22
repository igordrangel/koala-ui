import { afterRenderEffect } from '@angular/core';
import { Select } from '../select';

export function ajustOptionsContainerSize(component: Select) {
  afterRenderEffect(() => {
    const selectElement = component.selectElement;
    const optionsContainer = selectElement.parentElement?.querySelector(
      '.kl-select-options-container'
    ) as HTMLElement;

    function setMaxWidth() {
      const currentWidth = selectElement.offsetWidth;
      selectElement.style.setProperty('--select-width', `${currentWidth}px`);
    }

    function setMaxHeight() {
      const optionsRect = selectElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let availableHeight = viewportHeight - optionsRect.top - 16;

      if (availableHeight < 150) {
        availableHeight =
          viewportHeight - (viewportHeight - optionsRect.bottom) - 16;
        selectElement.style.setProperty('--select-position-area', 'top');
      } else {
        selectElement.style.setProperty('--select-position-area', 'bottom');
      }

      optionsContainer.style.maxHeight = `${availableHeight}px`;
    }

    function getFilterInput() {
      return optionsContainer.querySelector(
        '.kl-select-filter-container input'
      ) as HTMLInputElement | null;
    }

    function disableFilter() {
      const filterInput = getFilterInput();

      if (filterInput) {
        filterInput.disabled = true;
      }
    }

    function enableAndFocusFilter() {
      const filterInput = getFilterInput();

      if (filterInput) {
        filterInput.disabled = false;
        filterInput.focus();
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setMaxWidth();
          setMaxHeight();
          enableAndFocusFilter();
        } else {
          disableFilter();
        }
      });
    });

    setMaxWidth();

    observer.observe(optionsContainer);
    component.destroyRef.onDestroy(() => observer.unobserve(optionsContainer));
  });
}
