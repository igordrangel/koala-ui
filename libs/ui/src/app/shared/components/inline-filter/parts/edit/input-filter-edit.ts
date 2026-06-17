import { Component, effect, ElementRef, inject, input, output, signal } from '@angular/core';
import { InlineFilterField } from '../../config';
import { InlineFilterCalendar } from '../fields/calendar/inline-filter-calendar';
import { InlineFilterCombobox } from '../fields/combobox/inline-filter-combobox';
import { InlineFilterInput } from '../fields/input/inline-filter-input';
import { InlineFilterSelect } from '../fields/select/inline-filter-select';

@Component({
  selector: 'app-input-filter-edit',
  templateUrl: './input-filter-edit.html',
  imports: [InlineFilterInput, InlineFilterSelect, InlineFilterCombobox, InlineFilterCalendar],
  host: {
    class: 'block',
    '(document:click)': 'closeOutsideClick($event)',
    '(keyup)': 'onKeyUp($event)',
  },
})
export class InputFilterEdit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly handleCommand = (command: () => void) => setTimeout(() => command(), 50);
  private firstLoad = true;

  protected readonly closeOutsideClick = (event: PointerEvent) => {
    const contentElement = this.elementRef.nativeElement;
    const clickElement = event.target as HTMLElement;

    if (!contentElement?.contains(clickElement)) {
      this.exit();
    }
  };

  protected readonly onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Tab': {
        this.exit();
        break;
      }
      case 'Enter': {
        if (this.field().multiple) {
          return;
        }

        this.exit();
        break;
      }
      case 'Escape': {
        this.cancel();
        break;
      }
      default:
        break;
    }
  };

  readonly field = input.required<InlineFilterField>();
  readonly invalid = signal(false);
  readonly cancelEdit = output<void>();
  readonly exitEditMode = output<void>();

  private exit() {
    this.handleCommand(() => this.exitEditMode.emit());
  }

  private cancel() {
    this.handleCommand(() => this.cancelEdit.emit());
  }

  constructor() {
    effect(() => {
      const field = this.field();
      const value = field.value();

      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }

      if (['select', 'combobox'].includes(field.type) && !field.multiple && value) {
        this.exit();
      }
    });
  }
}
