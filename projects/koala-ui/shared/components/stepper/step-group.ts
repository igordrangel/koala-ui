import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({ selector: 'ul[klStepGroup]' })
export class StepGroup implements OnInit {
  private readonly elementRef = inject<ElementRef<HTMLUListElement>>(
    ElementRef<HTMLButtonElement>
  );

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('steps');
  }
}
