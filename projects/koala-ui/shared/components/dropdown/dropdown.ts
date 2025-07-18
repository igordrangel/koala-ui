import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

type DropdownVerticalPosition = 'top' | 'bottom' | 'left' | 'right';
type DropdownHorizontalPosition = 'start' | 'center' | 'end';

@Component({
  selector: 'kl-dropdown',
  templateUrl: './dropdown.html',
})
export class Dropdown {
  private readonly dropdownElement =
    viewChild<ElementRef<HTMLDivElement>>('dropdown');

  verticalPosition = input<DropdownVerticalPosition>('bottom');
  horizontalPosition = input<DropdownHorizontalPosition>('start');

  verticalPositionClass = computed(() => {
    switch (this.verticalPosition()) {
      case 'top':
        return 'dropdown-top';
      case 'left':
        return 'dropdown-left';
      case 'right':
        return 'dropdown-right';
      case 'bottom':
      default:
        return 'dropdown-bottom';
    }
  });

  horizontalPositionClass = computed(() => {
    switch (this.horizontalPosition()) {
      case 'start':
        return 'dropdown-start';
      case 'center':
        return 'dropdown-center';
      case 'end':
      default:
        return 'dropdown-end';
    }
  });

  constructor() {
    effect(() => {
      const dropdownElement = this.dropdownElement()?.nativeElement;

      if (dropdownElement) {
        dropdownElement.classList.add(
          this.verticalPositionClass(),
          this.horizontalPositionClass()
        );
      }
    });
  }
}
