import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { Input } from '../../input-field';

@Component({
  selector: 'app-input-calendar-time-row',
  templateUrl: './input-calendar-time-row.component.html',
  imports: [Input],
})
export class InputCalendarTimeRowComponent {
  private readonly timeInput = viewChild<ElementRef<HTMLInputElement>>('timeInput');

  readonly value = input('');
  readonly valueChange = output<string>();

  openPicker(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const input = this.timeInput()?.nativeElement;
    input?.focus();
    input?.showPicker?.();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.valueChange.emit(value);
  }
}
