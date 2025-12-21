import { afterRenderEffect } from '@angular/core';
import { Select } from '../select';

export function setValueOnElement(component: Select) {
  afterRenderEffect(() => {
    const currentWidth = component.selectElement.offsetWidth;
    component.selectElement.style.setProperty(
      '--select-width',
      `${currentWidth}px`
    );
  });
}
