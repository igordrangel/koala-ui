import { Dropdown } from '@/shared/components/dropdown';
import type { InputSize } from '@/shared/components/input-field';
import { booleanAttribute, Component, effect, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { Color, COLORS, getColorByName } from './colors';

@Component({
  selector: 'app-input-color',
  templateUrl: './input-color.html',
  imports: [Dropdown],
})
export class InputColor implements FormValueControl<string | null> {
  protected readonly isDisabled = signal(false);
  protected readonly dropdownOpened = signal(false);

  readonly value = model<string | null>(null);
  readonly touch = output<void>();
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

  constructor() {
    effect(() => {
      this.isDisabled.set(this.disabled());
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

  toggleDropdown(opened: boolean): void {
    if (this.isDisabled()) {
      return;
    }

    this.dropdownOpened.set(opened);
    this.touch.emit();
  }

  pickColor(color: Color): void {
    this.transparentSelected.set(false);
    this.selectedColor.set(color);
    this.value.set(color.colorName);
    this.colorPicked.emit(color.colorName);
  }

  clearColor(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.transparentSelected.set(true);
    this.selectedColor.set(null);
    this.value.set(null);
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
