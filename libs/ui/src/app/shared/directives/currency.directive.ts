import {
  Directive,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { currencyMask } from '../utils/currency-mask';

@Directive({
  selector: 'input[appCurrency]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMask),
      multi: true,
    },
  ],
})
export class CurrencyMask implements ControlValueAccessor, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly ngZone = inject(NgZone);
  private isEditingDecimal = false;
  private rawDecimalDigits = '';
  private suppressEmit = false;
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly prefix = input<string>();
  readonly decimalDigits = input<string>();
  readonly thousandSeparator = input<string>();
  readonly decimalSeparator = input<string>();

  private readonly onKeyDown = (event: KeyboardEvent) => this.handleKeyDown(event);
  private readonly onClick = () => this.syncEditingModeFromCaret();
  private readonly onBlur = () => {
    this.isEditingDecimal = false;
    this.rawDecimalDigits = '';
    this.onTouched();
  };
  private readonly onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const sep = this.getSep();
    const normalized = pasteData.replace(sep, '.').replace(/[^0-9.]/g, '');
    const num = parseFloat(normalized);
    if (!isNaN(num)) {
      this.writeValue(num);
      this.emitNumericValue(num.toString());
    }
  };

  constructor() {
    const el = this.elementRef.nativeElement;
    el.addEventListener('keydown', this.onKeyDown);
    el.addEventListener('click', this.onClick);
    el.addEventListener('blur', this.onBlur);
    el.addEventListener('paste', this.onPaste);

    effect(() => {
      this.render(this.elementRef.nativeElement.value);
    });
  }

  writeValue(value: number | null | undefined): void {
    const sep = this.getSep();
    this.suppressEmit = true;
    if (value == null || isNaN(value)) {
      this.render('0');
    } else {
      const str = value.toFixed(this.getSafeDecimalDigits()).replace('.', sep);
      this.render(str);
    }
    this.suppressEmit = false;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  private emitNumericValue(rawValue: string): void {
    const sep = this.getSep();
    const normalized = rawValue.replace(sep, '.');
    const num = parseFloat(normalized);
    this.ngZone.run(() => this.onChange(isNaN(num) ? null : num));
  }

  private getSep(): string {
    return this.decimalSeparator() || ',';
  }

  private getSafeDecimalDigits(): number {
    const raw = Number(this.decimalDigits());
    return Number.isFinite(raw) ? Math.max(0, Math.trunc(raw)) : 2;
  }

  private parseIntegerDigits(): string {
    const el = this.elementRef.nativeElement;
    const sep = this.getSep();
    const sepIndex = el.value.lastIndexOf(sep);
    const integerPart = sepIndex >= 0 ? el.value.slice(0, sepIndex) : el.value;
    return integerPart.replace(/\D/g, '');
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const sep = this.getSep();
    const safeDecimalDigits = this.getSafeDecimalDigits();

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      const integerDigits = this.parseIntegerDigits();

      if (this.isEditingDecimal) {
        if (this.rawDecimalDigits.length < safeDecimalDigits) {
          this.rawDecimalDigits += event.key;
        }
        this.render(`${integerDigits || '0'}${sep}${this.rawDecimalDigits}`);
      } else {
        const newInteger = (integerDigits + event.key).replace(/^0+(?=\d)/, '');
        this.render(newInteger);
      }
      return;
    }

    if (event.key === sep) {
      event.preventDefault();
      if (!this.isEditingDecimal) {
        this.isEditingDecimal = true;
        this.rawDecimalDigits = '';
        const integerDigits = this.parseIntegerDigits();
        this.render(`${integerDigits || '0'}${sep}`);
      }
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      const integerDigits = this.parseIntegerDigits();

      if (this.isEditingDecimal) {
        if (this.rawDecimalDigits.length > 0) {
          this.rawDecimalDigits = this.rawDecimalDigits.slice(0, -1);
          this.render(`${integerDigits || '0'}${sep}${this.rawDecimalDigits}`);
        } else {
          this.isEditingDecimal = false;
          const newInteger = integerDigits.slice(0, -1);
          this.render(newInteger);
        }
      } else {
        const newInteger = integerDigits.slice(0, -1);
        this.render(newInteger);
      }
      return;
    }

    if (event.key === 'Escape') {
      this.isEditingDecimal = false;
      this.rawDecimalDigits = '';
    }
  }

  private syncEditingModeFromCaret(): void {
    const el = this.elementRef.nativeElement;
    const sep = this.getSep();
    const decimalIndex = el.value.lastIndexOf(sep);
    const caretPosition = el.selectionStart ?? 0;

    if (decimalIndex < 0) {
      this.isEditingDecimal = false;
      this.rawDecimalDigits = '';
      return;
    }

    const nowDecimal = caretPosition > decimalIndex;
    if (nowDecimal && !this.isEditingDecimal) {
      const displayedDecimal = el.value.slice(decimalIndex + 1).replace(/\D/g, '');
      this.rawDecimalDigits = displayedDecimal.replace(/0+$/, '');
    } else if (!nowDecimal) {
      this.rawDecimalDigits = '';
    }
    this.isEditingDecimal = nowDecimal;
  }

  private render(rawValue: string): void {
    const el = this.elementRef.nativeElement;
    const sep = this.getSep();
    const safeDecimalDigits = this.getSafeDecimalDigits();

    const maskedValue = currencyMask(rawValue || '0', {
      currencyAlias: this.prefix(),
      decimalDigits: safeDecimalDigits,
      thousandSeparator: this.thousandSeparator(),
      decimalSeparator: sep,
      fixedDecimalScale: true,
    });

    el.value = maskedValue;
    if (!this.suppressEmit) {
      this.emitNumericValue(rawValue || '0');
    }

    const decimalIndex = maskedValue.lastIndexOf(sep);
    if (decimalIndex < 0) return;

    const cursorPosition = this.isEditingDecimal
      ? Math.min(
          decimalIndex + 1 + this.rawDecimalDigits.length,
          decimalIndex + 1 + safeDecimalDigits,
        )
      : decimalIndex;

    el.setSelectionRange(cursorPosition, cursorPosition);
  }

  ngOnDestroy(): void {
    const el = this.elementRef.nativeElement;
    el.removeEventListener('keydown', this.onKeyDown);
    el.removeEventListener('click', this.onClick);
    el.removeEventListener('blur', this.onBlur);
    el.removeEventListener('paste', this.onPaste);
  }
}
