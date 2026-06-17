import {
  booleanAttribute,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

@Directive({ selector: '[appTab]' })
export class Tab {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fallbackName = `tab-${Math.random().toString(16).slice(2)}`;
  private radioInput: HTMLInputElement | null = null;
  private initializedContentClasses = false;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly onTabChange = () => {
    if (!this.radioInput?.checked) {
      return;
    }

    // Delay resize a bit to avoid flicker while the tab content is being revealed.
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
      this.resizeTimeout = null;
      this.elementRef.nativeElement.dispatchEvent(
        new CustomEvent('appTabActivated', {
          detail: {
            label: this.label(),
            value: this.value(),
          },
          bubbles: true,
        }),
      );
    }, 120);
  };

  readonly label = input.required<string>();
  readonly checked = input(false, { transform: booleanAttribute });
  readonly value = input<unknown>(null);

  private get name() {
    const parent = this.elementRef.nativeElement.parentElement;
    if (!parent) {
      return this.fallbackName;
    }

    const existingInput = Array.from(parent.children).find(
      (element): element is HTMLInputElement =>
        element instanceof HTMLInputElement &&
        element.classList.contains('tab') &&
        element !== this.radioInput,
    );

    return existingInput?.name || this.radioInput?.name || this.fallbackName;
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
      }

      this.radioInput?.removeEventListener('change', this.onTabChange);
      this.radioInput?.remove();
      this.radioInput = null;
    });

    effect(() => {
      const host = this.elementRef.nativeElement;
      const parent = host.parentElement;
      if (!parent) {
        return;
      }

      if (!this.radioInput) {
        this.radioInput = document.createElement('input');
        this.radioInput.type = 'radio';
        this.radioInput.classList.add('tab');
        this.radioInput.addEventListener('change', this.onTabChange);
      }

      if (this.radioInput.parentElement !== parent) {
        parent.insertBefore(this.radioInput, host);
      }

      this.removeDuplicateInputsBeforeHost(host);

      this.radioInput.name = this.name;
      this.radioInput.checked = this.checked();
      this.radioInput.ariaLabel = this.label();

      if (!this.initializedContentClasses) {
        host.classList.add(
          'tab-content',
          'border-0',
          'border-t',
          'border-base-300',
          'rounded-none',
        );
        this.initializedContentClasses = true;
      }
    });
  }

  private removeDuplicateInputsBeforeHost(host: HTMLElement) {
    let cursor = host.previousElementSibling;

    while (cursor instanceof HTMLInputElement && cursor.classList.contains('tab')) {
      const current = cursor;
      cursor = current.previousElementSibling;

      if (current !== this.radioInput) {
        current.remove();
      }
    }
  }
}
