```html
<div
  class="flex items-center justify-center w-full h-[26rem] border border-neutral-700 rounded-2xl mt-4"
>
  <div class="flex flex-col items-center justify-center w-full">
    <ul class="w-full" klStepGroup>
      <li klStepItem label="Step 1" [currentStep]="stepper.currentStep()"></li>
      <li klStepItem label="Step 2" [currentStep]="stepper.currentStep()"></li>
      <li klStepItem label="Step 3" [currentStep]="stepper.currentStep()"></li>
    </ul>

    <div class="pt-8 w-2/3 h-1/2 scroll-auto">
      @switch (stepper.currentStep()) { 
        @case (1) {
          <p class="w-full">Content step 1</p>
          <span class="divider"></span>
          <div class="flex items-center justify-end gap-2 w-full">
            <button klButton color="primary" soft (click)="stepper.previous()">
              Previous
            </button>

            <button klButton color="primary" (click)="stepper.next()">
              Next
            </button>
          </div>
        } @case (2) {
          <p class="w-full">Content step 2</p>
          <span class="divider"></span>
          <div class="flex items-center justify-end gap-2 w-full">
            <button klButton color="primary" soft (click)="stepper.previous()">
              Previous
            </button>

            <button klButton color="primary" (click)="stepper.next()">
              Next
            </button>
          </div>
        } @case (3) {
          <p class="w-full">Content step 3</p>
          <span class="divider"></span>
          <div class="flex items-center justify-end gap-2 w-full">
            <button klButton color="primary" soft (click)="stepper.previous()">
              Previous
            </button>
          </div>
        } 
      }
    </div>
  </div>
</div>
```
