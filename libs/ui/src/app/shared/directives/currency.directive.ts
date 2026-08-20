import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { currencyMask } from '../utils/currency-mask';

@Directive({
  selector: 'input[appCurrency]',
  host: {
    '(blur)': 'onBlur()',
  },
})
export class CurrencyMask implements FormValueControl<number | null>, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private isEditingDecimal = false;
  private rawDecimalDigits = '';
  private suppressEmit = false;

  readonly value = model<number | null>(null);
  readonly prefix = input<string>();
  readonly decimalDigits = input<string>();
  readonly thousandSeparator = input<string>();
  readonly decimalSeparator = input<string>();
  readonly disabled = input(false);
  readonly touch = output<void>();

  private readonly onInput = () => {
    const el = this.elementRef.nativeElement;
    const sep = this.getSep();
    const thousandSep = this.thousandSeparator() || '.';
    // Match currencyMask default alias when prefix input is unset.
    const prefix = this.prefix() ?? 'R$';

    let rawValue = el.value;
    if (prefix) {
      rawValue = rawValue.replace(prefix, '').trimStart();
    }
    rawValue = rawValue.split(thousandSep).join('');

    const maskedValue = currencyMask(rawValue || '0', {
      currencyAlias: prefix,
      decimalDigits: this.getSafeDecimalDigits(),
      thousandSeparator: thousandSep,
      decimalSeparator: sep,
      fixedDecimalScale: true,
    });

    el.value = maskedValue;

    if (!this.suppressEmit) {
      this.emitNumericValue(rawValue || '0');
    }
  };

  private readonly onKeyDown = (event: KeyboardEvent) => this.handleKeyDown(event);
  private readonly onClick = () => this.syncEditingModeFromCaret();
  private readonly onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const sep = this.getSep();
    const normalized = pasteData.replace(sep, '.').replace(/[^0-9.]/g, '');
    const num = parseFloat(normalized);
    if (!isNaN(num)) {
      this.applyExternalValue(num);
      this.emitNumericValue(num.toString());
    }
  };

  constructor() {
    const el = this.elementRef.nativeElement;
    el.addEventListener('input', this.onInput);
    el.addEventListener('keydown', this.onKeyDown);
    el.addEventListener('click', this.onClick);
    el.addEventListener('paste', this.onPaste);

    effect(() => {
      const value = this.value();
      const sep = this.getSep();
      const safeDecimalDigits = this.getSafeDecimalDigits();
      const raw =
        value == null || isNaN(value) ? '0' : value.toFixed(safeDecimalDigits).replace('.', sep);
      const masked = currencyMask(raw, {
        currencyAlias: this.prefix(),
        decimalDigits: safeDecimalDigits,
        thousandSeparator: this.thousandSeparator(),
        decimalSeparator: sep,
        fixedDecimalScale: true,
      });

      if (el.value === masked) {
        return;
      }

      this.suppressEmit = true;
      el.value = masked;
      this.suppressEmit = false;
    });

    effect(() => {
      el.disabled = this.disabled();
    });
  }

  protected onBlur() {
    this.isEditingDecimal = false;
    this.rawDecimalDigits = '';
    this.touch.emit();
  }

  private applyExternalValue(value: number | null | undefined): void {
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

  private emitNumericValue(rawValue: string): void {
    const sep = this.getSep();
    const normalized = rawValue.replace(sep, '.');
    const num = parseFloat(normalized);
    this.value.set(isNaN(num) ? null : num);
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
    el.removeEventListener('input', this.onInput);
    el.removeEventListener('keydown', this.onKeyDown);
    el.removeEventListener('click', this.onClick);
    el.removeEventListener('paste', this.onPaste);
  }
}
