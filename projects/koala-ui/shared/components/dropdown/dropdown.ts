import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { KlString, randomString } from '@koalarx/utils/KlString';

@Component({
  selector: 'kl-dropdown',
  templateUrl: './dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown implements OnInit, OnDestroy {
  private readonly dropdownTriggerElement =
    viewChild<ElementRef<HTMLButtonElement>>('dropdownTrigger');
  private readonly dropdownContentElement =
    viewChild<ElementRef<HTMLDivElement>>('dropdownContent');
  private readonly closeInsideClick = (event: PointerEvent) => {
    if (this.insideClick()) {
      return;
    }

    const contentElement = this.dropdownContentElement()?.nativeElement;
    const clickElement = event.target as HTMLElement;

    if (contentElement && contentElement.contains(clickElement)) {
      contentElement.hidePopover();
    }
  };

  readonly id = randomString(10, {
    numbers: true,
    uppercase: false,
    lowercase: false,
  });
  readonly insideClick = input(false, { transform: booleanAttribute });
  readonly anchorName = new KlString('--anchor-').concat(this.id);

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

  ngOnDestroy() {
    document.removeEventListener('click', this.closeInsideClick);
  }

  ngOnInit() {
    document.addEventListener('click', this.closeInsideClick);
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
