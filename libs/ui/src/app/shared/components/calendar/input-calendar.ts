import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KlDate } from '@koalarx/utils/KlDate';
import 'cally';
import { Calendar } from '.';
import { Mask } from '../../directives/mask.directive';
import { Dropdown, DropdownContainer } from '../dropdown';
import type { InputSize } from '../input-field';
import { Input } from '../input-field';
import { setupMonthDisplayYearEffect } from './effects/setup-input-calendar-effects';
import {
  createMonthOptions,
  getDatePart,
  getDisplayValue,
  getInputMask,
  getTimePart,
  normalizeInputText,
  parseInputValue,
  toSelectedDateValue,
} from './input-calendar.helpers';
import { InputCalendarFormat, InputCalendarType } from './input-calendar.types';
import { InputCalendarMonthPickerComponent } from './parts/input-calendar-month-picker.component';
import { InputCalendarTimeRowComponent } from './parts/input-calendar-time-row.component';

const RANGE_SEPARATOR = ' - ';

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.html',
  styleUrls: ['./input-calendar.css'],
  imports: [
    Calendar,
    Dropdown,
    InputCalendarMonthPickerComponent,
    InputCalendarTimeRowComponent,
    Input,
    Mask,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCalendar),
      multi: true,
    },
  ],
})
export class InputCalendar implements ControlValueAccessor {
  private onChanged: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly textInput = viewChild<ElementRef<HTMLInputElement>>('textInput');
  private readonly dropdown = viewChild(DropdownContainer);
  private readonly rangeEditTarget = signal<'from' | 'to'>('from');

  protected isDisabled = signal(false);

  readonly format = input<InputCalendarFormat>('dd/MM/yyyy');
  readonly type = input<InputCalendarType>('date');
  readonly size = input<InputSize>('md');
  readonly inline = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly value = model<string>('');
  readonly placeholder = input<string>('Pick a date');
  readonly inputValue = signal<string>('');
  readonly inputMask = computed(() => {
    if (this.type() !== 'daterange') {
      return getInputMask(this.type(), this.format());
    }

    return this.rangeEditTarget() === 'to'
      ? ' - 00/00/0000'
      : getInputMask('daterange', this.format());
  });
  readonly timeValue = computed(() => getTimePart(this.value()));
  readonly displayedYear = signal<number>(new Date().getFullYear());
  readonly monthOptions = createMonthOptions('pt-BR');

  constructor() {
    effect(() => this.isDisabled.set(this.disabled()));

    effect(() => {
      if (this.type() === 'daterange') {
        this.rangeEditTarget.set('from');
      }

      this.inputValue.set(getDisplayValue(this.value(), this.type(), this.format()));
    });

    setupMonthDisplayYearEffect({
      type: this.type,
      value: this.value,
      setDisplayedYear: (year) => this.displayedYear.set(year),
    });
  }

  private handleRangeDeleteFromStart(input: HTMLInputElement, value: string) {
    const separatorIndex = value.indexOf(RANGE_SEPARATOR);

    let nextValue = '';

    if (separatorIndex === -1) {
      nextValue = value.slice(1);
    } else {
      const fromValue = value.slice(0, separatorIndex);
      const toValue = value.slice(separatorIndex + RANGE_SEPARATOR.length);
      const nextFromValue = fromValue.slice(1);

      nextValue =
        nextFromValue.length > 0 ? `${nextFromValue}${RANGE_SEPARATOR}${toValue}` : toValue;
    }

    this.applyInputText(input, nextValue);
    this.inputValue.set(nextValue);
    this.rangeEditTarget.set('from');

    this.applyParsedValue(nextValue);

    queueMicrotask(() => {
      this.setCursor(input, 0);
    });
  }

  private hasCollapsedSelection(start: number | null, end: number | null): start is number {
    return start !== null && end !== null && start === end;
  }

  private setCursor(input: HTMLInputElement, position: number) {
    input.setSelectionRange(position, position);
  }

  private applyInputText(input: HTMLInputElement | null, value: string) {
    if (!input || input.value === value) {
      return;
    }

    input.value = value;
  }

  private notifyValueChange() {
    this.onChanged(this.value());
  }

  private applyParsedValue(rawValue: string) {
    const parsedValue = parseInputValue(rawValue, this.type(), this.format());

    if (parsedValue === undefined) {
      return;
    }

    this.value.set(parsedValue);
    this.notifyValueChange();
  }

  private syncRangeEditTarget(rawValue: string) {
    if (this.type() !== 'daterange') {
      return;
    }

    if (!rawValue.trim()) {
      this.rangeEditTarget.set('from');
      return;
    }

    const [fromValue = ''] = rawValue.split(/\s-\s/);

    if (fromValue.replace(/\D/g, '').length > 0) {
      this.rangeEditTarget.set('from');
    }
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const rawValue = normalizeInputText(input?.value ?? '', this.type());

    this.applyInputText(input, rawValue);
    this.inputValue.set(rawValue);

    this.syncRangeEditTarget(rawValue);
    this.applyParsedValue(rawValue);
  }

  onInputKeydown(event: KeyboardEvent) {
    if (this.type() !== 'daterange') {
      return;
    }

    const isBackspace = event.key === 'Backspace';
    const isDelete = event.key === 'Delete';

    if (!isBackspace && !isDelete) {
      return;
    }

    const input = event.target as HTMLInputElement | null;

    if (!input) {
      return;
    }

    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (!this.hasCollapsedSelection(start, end)) {
      return;
    }

    const value = input.value;

    if (isDelete && start === 0) {
      event.preventDefault();
      this.handleRangeDeleteFromStart(input, value);
      return;
    }

    const separator = ' - ';
    const separatorIndex = value.indexOf(separator);

    if (separatorIndex !== -1) {
      const fromValue = value.slice(0, separatorIndex);
      const fromDigits = fromValue.replace(/\D/g, '');
      const toStart = separatorIndex + separator.length;
      const toValue = value.slice(toStart);
      const toDigits = toValue.replace(/\D/g, '');

      if (isBackspace && toDigits.length === 0 && start >= toStart) {
        this.rangeEditTarget.set('from');
        this.setCursor(input, separatorIndex);
        return;
      }

      if (isDelete && toDigits.length === 0 && fromDigits.length > 0 && start >= toStart) {
        event.preventDefault();
        this.rangeEditTarget.set('from');
        this.setCursor(input, separatorIndex);
        return;
      }
    }

    const [, toCanonical = ''] = this.value().split('/');
    const hasCanonicalToDate = !!toCanonical;
    const fromDigits = (separatorIndex === -1 ? value : value.slice(0, separatorIndex)).replace(
      /\D/g,
      '',
    );

    const shouldJumpToToDate = start === 0 && fromDigits.length === 0 && hasCanonicalToDate;

    if (!shouldJumpToToDate) {
      return;
    }

    event.preventDefault();

    this.rangeEditTarget.set('to');

    let formattedToDate = '';

    try {
      formattedToDate = new KlDate(`${toCanonical}T00:00:00`).format(this.format());
    } catch {
      formattedToDate = '';
    }

    const nextValue = formattedToDate ? ` - ${formattedToDate}` : '';

    this.applyInputText(input, nextValue);
    this.inputValue.set(nextValue);

    queueMicrotask(() => {
      this.setCursor(input, input.value.length);
    });
  }

  openPopover() {
    this.dropdown()?.open();
    this.textInput()?.nativeElement.focus();
    this.onTouched();
  }

  setDateValue(value: KlDate) {
    this.value.set(toSelectedDateValue(value, this.type(), this.value()));
    this.notifyValueChange();
  }

  setRangeValue(value: string) {
    this.value.set(value);
    this.notifyValueChange();
  }

  changeDisplayedYear(step: number) {
    this.displayedYear.update((value) => value + step);
  }

  setMonthValue(month: number) {
    const parsedMonth = String(month + 1).padStart(2, '0');
    this.value.set(`${this.displayedYear()}-${parsedMonth}`);
    this.notifyValueChange();
  }

  setTimeValue(value: string) {
    if (this.type() !== 'datetime') {
      return;
    }

    const dateValue = getDatePart(this.value()) || new KlDate(new Date()).format('yyyy-MM-dd');

    this.value.set(`${dateValue}T${value}`);
    this.notifyValueChange();
  }

  clear(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.value.set('');
    this.inputValue.set('');
    this.notifyValueChange();
    this.textInput()?.nativeElement.focus();
  }
}
