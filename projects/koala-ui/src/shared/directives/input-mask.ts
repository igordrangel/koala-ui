import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { NgxMaskPipe } from 'ngx-mask';

@Directive({ selector: 'input[mask]', providers: [NgxMaskPipe] })
export class InputMask {
  private readonly ngxMask = inject(NgxMaskPipe);
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(
    ElementRef<HTMLInputElement>
  );

  private get currentValue() {
    return this.input.value;
  }

  private get input() {
    return this.elementRef.nativeElement;
  }

  mask = input.required<string>();

  constructor() {
    effect(() => {
      const mask = this.mask();

      if (mask) {
        this.elementRef.nativeElement.addEventListener('keyup', () =>
          this.applyMask(mask)
        );
        this.elementRef.nativeElement.addEventListener('keypress', () =>
          this.applyMask(mask)
        );
        this.elementRef.nativeElement.addEventListener('keydown', () =>
          this.applyMask(mask)
        );

        setTimeout(() => this.applyMask(mask), 1);
      }
    });
  }

  private applyMask(mask: string) {
    this.setValue(this.ngxMask.transform(this.currentValue, mask));
  }

  private setValue(value: string) {
    this.input.value = value;
  }
}
