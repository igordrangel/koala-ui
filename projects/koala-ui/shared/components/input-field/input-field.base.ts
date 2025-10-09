import {
  booleanAttribute,
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
import { ThemeName } from '@koalarx/ui/theme';
import { randomString } from '@koalarx/utils/KlString';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith } from 'rxjs/internal/operators/startWith';

@Directive()
export abstract class InputFieldBase {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly required = signal(false);
  private readonly currentTheme = signal<ThemeName | null>(null);
  protected readonly isDisabled = linkedSignal(() => this.disabled());
  protected readonly isRequired = this.required.asReadonly();
  protected readonly fieldId = randomString(10, {
    lowercase: true,
    uppercase: true,
  });

  control = input.required<FormControl>();
  label = input<string>();
  placeholder = input<string>('');
  hint = input<string>();
  disabled = input(false, { transform: booleanAttribute });

  constructor() {
    effect(() => this.checkIsRequired(this.control()));

    effect(() => {
      this.currentTheme();

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

    interval(50)
      .pipe(startWith(0), takeUntilDestroyed())
      .subscribe(() => {
        const theme = document
          .querySelector('html')
          ?.getAttribute('data-theme') as ThemeName | null;

        if (theme === this.currentTheme()) {
          return;
        }

        this.currentTheme.set(theme);
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
