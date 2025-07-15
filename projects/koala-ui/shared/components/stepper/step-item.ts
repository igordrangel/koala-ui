import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { generateQuerySelector } from '@koalarx/ui/shared/utils';

@Directive({ selector: 'li[klStepItem]' })
export class StepItem implements OnInit {
  private readonly elementRef = inject<ElementRef<HTMLLIElement>>(
    ElementRef<HTMLButtonElement>
  );

  label = input.required<string>();
  indexStep = signal<number>(0);
  currentStep = input.required<number>();

  constructor() {
    effect(() => {
      const currentStep = this.currentStep();
      const stepIndex = this.getStepIndex();

      if (stepIndex < currentStep) {
        this.elementRef.nativeElement.classList.add('step-primary');
        this.elementRef.nativeElement.dataset['content'] = '✓';
      } else if (currentStep === stepIndex) {
        this.elementRef.nativeElement.classList.add('step-primary');
        delete this.elementRef.nativeElement.dataset['content'];
      } else {
        this.elementRef.nativeElement.classList.remove('step-primary');
        delete this.elementRef.nativeElement.dataset['content'];
      }
    });
  }

  private getStepIndex(): number {
    const elementSelector = generateQuerySelector(
      this.elementRef.nativeElement
    );
    const elements = document.querySelectorAll(elementSelector);

    let elementCountPosition = 0;

    elements.forEach((el, index) => {
      if (el === this.elementRef.nativeElement) {
        elementCountPosition = index + 1;
        return;
      }
    });

    return elementCountPosition;
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('step');
    this.elementRef.nativeElement.innerText = this.label();
  }
}
