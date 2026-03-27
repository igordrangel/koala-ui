import {
  afterRenderEffect,
  booleanAttribute,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { CURRENT_THEME } from '@koalarx/ui/core/config';
import { randomString } from '@koalarx/utils/KlString';

@Directive()
export abstract class InputFieldBase {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly required = signal(false);

  readonly destroyRef = inject(DestroyRef);
  readonly isDisabled = linkedSignal(() => this.disabled());
  readonly isRequired = this.required.asReadonly();
  readonly fieldId = randomString(10, {
    lowercase: true,
    uppercase: true,
  });
  readonly valueChange = signal<any>(null);

  control = input.required<FormControl>();
  label = input<string>();
  placeholder = input<string>('');
  hint = input<string>();
  disabled = input(false, { transform: booleanAttribute });

  constructor() {
    effect(() => this.checkIsRequired(this.control()));

    effect(() => {
      CURRENT_THEME();

      if (
        this.elementRef.nativeElement?.tagName.toLowerCase() !==
        'kl-input-field'
      ) {
        const container = this.elementRef.nativeElement.parentElement;

        if (container) {
          const containerBgColor = this.getBgColorParent(container);

          this.elementRef.nativeElement.style = `--bg-input: ${containerBgColor}`;
        }
      }
    });

    afterRenderEffect(() => {
      this.valueChange.set(this.control().value);

      this.control()
        .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(this.valueChange.set);
    });
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
}
