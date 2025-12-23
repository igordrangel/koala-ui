import { afterRenderEffect } from '@angular/core';
import { Select } from '../select';
import { SelectExperimental } from '../select-experimental';

export function ajustOptionsContainerSize(
  component: Select | SelectExperimental
) {
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
      const sizeDiscount =
        component instanceof SelectExperimental ? 16 : 16 + optionsRect.height;

      let availableHeight = viewportHeight - optionsRect.top - sizeDiscount;

      if (availableHeight < 150) {
        availableHeight =
          viewportHeight - (viewportHeight - optionsRect.bottom) - sizeDiscount;
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

    function touchControl() {
      component.control().markAsTouched();
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          component.selectElement.classList.add('opened');
          setMaxWidth();
          setMaxHeight();
          enableAndFocusFilter();
          touchControl();
        } else {
          component.selectElement.classList.remove('opened');
          disableFilter();
        }
      });
    });

    setMaxWidth();

    observer.observe(optionsContainer);
    component.destroyRef.onDestroy(() => observer.unobserve(optionsContainer));
  });
}
