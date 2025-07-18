import { Component, effect, ElementRef, viewChild } from '@angular/core';
import { KlString, randomString } from '@koalarx/utils/KlString';

@Component({
  selector: 'kl-dropdown',
  templateUrl: './dropdown.html',
})
export class Dropdown {
  private readonly dropdownTriggerElement =
    viewChild<ElementRef<HTMLButtonElement>>('dropdownTrigger');
  private readonly dropdownContentElement =
    viewChild<ElementRef<HTMLDivElement>>('dropdownContent');

  id = randomString(10, { numbers: true, uppercase: false, lowercase: false });

  private readonly anchorName = new KlString('--anchor-').concat(this.id);

  constructor() {
    effect(() => {
      const triggerElement = this.dropdownTriggerElement()?.nativeElement;
      const contentElement = this.dropdownContentElement()?.nativeElement;

      if (triggerElement && contentElement) {
        triggerElement.style = `anchor-name: ${this.anchorName};`;
        contentElement.style = `position-anchor: ${this.anchorName};`;
      }
    });
  }

  ajustPosition() {
    const triggerElement = this.dropdownTriggerElement()?.nativeElement;
    const contentElement = this.dropdownContentElement()?.nativeElement;

    if (triggerElement && contentElement) {
      setTimeout(() => {
        const position = contentElement.getBoundingClientRect();
        const screenWidth = document.body.clientWidth;
        const screenHeight = document.body.clientHeight;

        if (position.right > screenWidth) {
          contentElement.classList.add('dropdown-left');
          contentElement.classList.add('dropdown-start');
        }

        if (position.bottom > screenHeight) {
          contentElement.classList.add('dropdown-top');
        }
      });
    }
  }
}
