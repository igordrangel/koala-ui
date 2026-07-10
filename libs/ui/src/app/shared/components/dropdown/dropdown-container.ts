import {
  booleanAttribute,
  Component,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  output,
  resource,
  viewChild,
} from '@angular/core';
import { randomString } from '@koalarx/utils/KlString';
import { resolveStableWidth } from './resolve-stable-width';

export type DropdownMode = 'menu' | 'options' | 'menuOptions';
export type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown-container.html',
})
export class DropdownContainer implements OnInit, OnDestroy {
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
  private readonly dropdownToggle = (event: ToggleEvent) => {
    this.isOpen.emit(event.newState === 'open');

    if (event.newState === 'closed') {
      this.closed.emit();
    } else if (event.newState === 'open') {
      this.opened.emit();
    }
  };

  readonly id = randomString(10, {
    numbers: true,
    uppercase: false,
    lowercase: false,
  });
  readonly mode = input<DropdownMode>('menu');
  readonly insideClick = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly opened = output<void>();
  readonly closed = output<void>();
  readonly isOpen = output<boolean>();

  readonly triggerWidth = resource({
    defaultValue: 200,
    loader: ({ abortSignal }) => resolveStableWidth(() => this.readTriggerWidth(), abortSignal),
  });

  private readTriggerWidth(): number | undefined {
    const trigger = this.dropdownTriggerElement()?.nativeElement;
    if (!trigger) {
      return undefined;
    }

    const width = Math.max(
      trigger.getBoundingClientRect().width,
      trigger.parentElement?.getBoundingClientRect().width ?? 0,
    );

    return width > 0 ? width : undefined;
  }

  private isOverlapTrigger(triggerElement: HTMLElement, contentElement: HTMLElement) {
    const triggerRect = triggerElement.getBoundingClientRect();
    const contentRect = contentElement.getBoundingClientRect();

    return !(
      contentRect.bottom < triggerRect.top ||
      contentRect.top > triggerRect.bottom ||
      contentRect.right < triggerRect.left ||
      contentRect.left > triggerRect.right
    );
  }

  private get positionDefinitions() {
    return {
      menu: {
        top: ['dropdown-start', 'dropdown-top', 'mb-1'],
        bottom: ['dropdown-start', 'dropdown-bottom', 'mt-1'],
        left: ['dropdown-start', 'dropdown-left', 'mr-1'],
        right: ['dropdown-start', 'dropdown-right', 'ml-1'],
      },
      options: {
        top: ['dropdown-center', 'dropdown-top', 'mb-1'],
        bottom: ['dropdown-center', 'dropdown-bottom', 'mt-1'],
        left: ['dropdown-center', 'dropdown-left', 'mr-1'],
        right: ['dropdown-center', 'dropdown-right', 'ml-1'],
      },
      menuOptions: {
        top: ['dropdown-start', 'dropdown-top', 'mb-1'],
        bottom: ['dropdown-start', 'dropdown-bottom', 'mt-1'],
        left: ['dropdown-start', 'dropdown-left', 'mr-1'],
        right: ['dropdown-start', 'dropdown-right', 'ml-1'],
      },
    };
  }

  private getPositionDefinition(position: DropdownPosition) {
    return this.positionDefinitions[this.mode()][position];
  }

  private getPosition(currentPosition?: DropdownPosition): DropdownPosition {
    const mode = this.mode();

    if (mode === 'menu') {
      switch (currentPosition) {
        case 'top':
          return 'bottom';
        case 'bottom':
          return 'left';
        case 'left':
          return 'right';
        case 'right':
          return 'top';
        default:
          return 'left';
      }
    }

    switch (currentPosition) {
      case 'top':
        return 'right';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return 'bottom';
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.closeInsideClick);
    this.dropdownContentElement()?.nativeElement.removeEventListener('toggle', this.dropdownToggle);
  }

  ngOnInit() {
    document.addEventListener('click', this.closeInsideClick);
    this.dropdownContentElement()?.nativeElement.addEventListener('toggle', this.dropdownToggle);
  }

  open() {
    const contentElement = this.dropdownContentElement()?.nativeElement as
      | (HTMLElement & { showPopover?: () => void })
      | undefined;

    if (!contentElement?.showPopover || contentElement.matches(':popover-open')) {
      return;
    }

    contentElement.showPopover();
    this.ajustPosition();

    if (this.mode() === 'options') {
      requestAnimationFrame(() => this.triggerWidth.reload());
    }
  }

  close() {
    const contentElement = this.dropdownContentElement()?.nativeElement as
      | (HTMLElement & { hidePopover?: () => void })
      | undefined;

    contentElement?.hidePopover();
    this.isOpen.emit(false);
  }

  ajustPosition() {
    const triggerElement = this.dropdownTriggerElement()?.nativeElement;
    const contentElement = this.dropdownContentElement()?.nativeElement;

    if (triggerElement && contentElement) {
      let currentPosition = this.getPosition();
      let currentPositionDefinition = this.getPositionDefinition(currentPosition);

      contentElement.classList.add(...currentPositionDefinition);

      setTimeout(() => {
        let isAboveTrigger = false;
        let tryCount = 0;
        const maxCount = 3;

        do {
          isAboveTrigger = this.isOverlapTrigger(triggerElement, contentElement);

          if (isAboveTrigger) {
            contentElement.classList.remove(...currentPositionDefinition);

            currentPosition = this.getPosition(currentPosition);
            currentPositionDefinition = this.getPositionDefinition(currentPosition);

            contentElement.classList.add(...currentPositionDefinition);
          }

          tryCount++;
        } while (isAboveTrigger && tryCount < maxCount);
      });
    }
  }
}
