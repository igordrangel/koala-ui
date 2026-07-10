import { Dropdown } from '@/shared/components/dropdown';
import type { InputSize } from '@/shared/components/input-field';
import {
  booleanAttribute,
  Component,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, COLORS, getColorByName } from './colors';

@Component({
  selector: 'app-input-color',
  templateUrl: './input-color.html',
  imports: [Dropdown],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputColor),
      multi: true,
    },
  ],
})
export class InputColor implements ControlValueAccessor {
  private onChanged: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};
  private formDisabled = false;

  protected readonly isDisabled = signal(false);
  protected readonly dropdownOpened = signal(false);

  readonly placeholder = input('Select a color');
  readonly label = input<string>();
  readonly inline = input(false, { transform: booleanAttribute });
  readonly size = input<InputSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  /** undefined = sem seleção, null = transparente, string = cor da paleta */
  readonly syncColorName = input<string | null | undefined>(undefined);
  readonly clearable = input(false, { transform: booleanAttribute });

  readonly colorPicked = output<string | null>();

  readonly selectedColor = signal<Color | null>(null);
  readonly transparentSelected = signal(false);

  readonly colors = COLORS;

  private readonly value = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.isDisabled.set(this.disabled() || this.formDisabled);
    });

    effect(() => {
      const sync = this.syncColorName();

      if (sync !== undefined) {
        this.applySelection(sync);
        return;
      }

      this.applySelection(this.value());
    });
  }

  writeValue(value: string | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
    this.isDisabled.set(this.disabled() || this.formDisabled);
  }

  toggleDropdown(opened: boolean): void {
    if (this.isDisabled()) {
      return;
    }

    this.dropdownOpened.set(opened);
    this.onTouched();
  }

  pickColor(color: Color): void {
    this.transparentSelected.set(false);
    this.selectedColor.set(color);
    this.value.set(color.colorName);
    this.onChanged(color.colorName);
    this.colorPicked.emit(color.colorName);
  }

  clearColor(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.transparentSelected.set(true);
    this.selectedColor.set(null);
    this.value.set(null);
    this.onChanged(null);
    this.colorPicked.emit(null);
  }

  private applySelection(value: string | null | undefined): void {
    if (value === null) {
      this.transparentSelected.set(true);
      this.selectedColor.set(null);
      return;
    }

    if (value) {
      this.transparentSelected.set(false);
      this.selectedColor.set(getColorByName(value));
      return;
    }

    this.transparentSelected.set(false);
    this.selectedColor.set(null);
  }
}
