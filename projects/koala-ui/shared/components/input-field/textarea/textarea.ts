import {
  booleanAttribute,
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';

@Component({
  selector: 'kl-textarea',
  templateUrl: './textarea.html',
  imports: [ReactiveFormsModule, FieldErrors],
})
export class Textarea extends InputFieldBase {
  private readonly textareaElement =
    viewChild<ElementRef<HTMLTextAreaElement>>('textareaElement');

  rows = input<number>(3);
  resizeble = input(false, { transform: booleanAttribute });

  constructor() {
    super();

    effect(() => {
      const textarea = this.textareaElement()?.nativeElement;

      if (textarea) {
        textarea.style.resize = this.resizeble() ? 'vertical' : 'none';
      }
    });
  }
}
