import {
  Directive,
  effect,
  inject,
  input,
  ViewContainerRef,
} from '@angular/core';

@Directive({ selector: '[hookChange]' })
export class HookChange {
  private readonly viewContainerRef = inject(ViewContainerRef);

  hookChange = input.required<any>();

  constructor() {
    effect(() => {
      this.hookChange();
      const onChange = this.viewContainerRef.element.nativeElement.onchange;

      if (onChange) {
        onChange();
      }
    });
  }
}
