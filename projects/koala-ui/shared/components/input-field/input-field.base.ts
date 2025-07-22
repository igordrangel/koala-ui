import {
  AfterViewInit,
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { randomString } from '@koalarx/utils/KlString';

@Directive()
export abstract class InputFieldBase implements AfterViewInit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly required = signal(false);
  protected readonly isDisabled = linkedSignal(() => this.disabled());
  protected readonly isRequired = this.required.asReadonly();
  protected readonly fieldId = randomString(10, {
    lowercase: true,
    uppercase: true,
  });

  control = input.required<FormControl>();
  label = input<string>();
  placeholder = input<string>('');
  disabled = input(false, { transform: booleanAttribute });

  constructor() {
    effect(() => this.checkIsRequired(this.control()));
  }

  private getBgColorParent(element: HTMLElement): string {
    const containerBgColor = window.getComputedStyle(element).backgroundColor;

    if (!containerBgColor || containerBgColor === 'rgba(0, 0, 0, 0)') {
      if (!element.parentElement) {
        return 'var(--color-base-100)';
      }

      return this.getBgColorParent(element.parentElement!);
    }

    return containerBgColor;
  }

  private checkIsRequired(control: FormControl) {
    this.required.set(control.hasValidator(Validators.required));
  }

  ngAfterViewInit(): void {
    if (
      this.elementRef.nativeElement?.tagName.toLowerCase() !== 'kl-input-field'
    ) {
      const container = this.elementRef.nativeElement.parentElement;

      if (container) {
        const containerBgColor = this.getBgColorParent(container);

        this.elementRef.nativeElement.style = `--bg-input: ${containerBgColor}`;
      }
    }
  }
}
