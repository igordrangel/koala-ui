import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { AppConfig } from '@koalarx/ui/core/config';
import { KlNumber } from '@koalarx/utils/KlNumber';
import { unmaskCoin } from '@koalarx/utils/KlString';
import { NgxMaskPipe } from 'ngx-mask';

@Directive({
  selector: 'input[currencyMask]',
  providers: [NgxMaskPipe],
})
export class InputCurrencyMask implements OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(
    ElementRef<HTMLInputElement>,
  );
  private readonly appConfig = inject(AppConfig);
  private writedValue = 0.0;

  decimalCount = input<number>(2);
  currencyValue = output<number>();

  private maskCoin(value: number) {
    let prefix = '$';
    let thousandSeparator = ',';
    let decimalSeparator = '.';

    switch (this.appConfig.language) {
      case 'en':
        prefix = '$';
        break;
      case 'ptBr':
        thousandSeparator = '.';
        decimalSeparator = ',';
        prefix = 'R$';
        break;
    }

    return new KlNumber(value).maskCoin(
      prefix,
      thousandSeparator,
      decimalSeparator,
      this.decimalCount(),
    );
  }

  private unmaskCoin(value: string): number {
    return unmaskCoin(value, this.decimalCount());
  }

  private applyMask() {
    this.setValue(this.maskCoin(this.writedValue));
  }

  private get currentValue() {
    return this.input.value;
  }

  private setValue(value: string) {
    this.input.value = value;
  }

  private get input() {
    return this.elementRef.nativeElement;
  }

  private onFocus = () => {
    this.putInputCaretOnTheEnd();
  };

  private onKeyUp = (event: KeyboardEvent) => {
    if (/\d/.test(event.key) || event.key === 'Backspace') {
      this.updateWritedValue(event.key, event.key === 'Backspace');

      if (isNaN(this.writedValue)) {
        this.writedValue = 0;
      }

      this.applyMask();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.putInputCaretOnTheEnd();
    }
  };

  private onKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
    }
  };

  private onPaste = (event: ClipboardEvent) => {
    event.preventDefault();

    if (!event.clipboardData) {
      return;
    }

    const pastedValue = event.clipboardData.getData('Text');

    let unmaskedValue = parseFloat(pastedValue);

    if (pastedValue.includes(',')) {
      unmaskedValue = this.unmaskCoin(event.clipboardData.getData('Text'));
    }

    this.setValue(this.maskCoin(unmaskedValue));
  };

  private onReset = () => {
    this.writedValue = 0.0;
    this.applyMask();
  };

  private onChange = () => {
    if (this.writedValue !== 0) {
      return;
    }

    let unmaskedValue = +this.currentValue;

    if (isNaN(unmaskedValue)) {
      unmaskedValue = this.unmaskCoin(this.currentValue);
    }

    this.writedValue = unmaskedValue;
    this.applyMask();
  };

  private putInputCaretOnTheEnd() {
    setTimeout(() =>
      this.input.setSelectionRange(
        this.currentValue.length,
        this.currentValue.length,
      ),
    );
  }

  private updateWritedValue(key: string, backspace = false) {
    let decimal = '';

    for (let i = 0; i < this.decimalCount(); i++) {
      decimal += '0';
    }

    if (backspace) {
      const match = (this.writedValue / 10)
        .toString()
        .match(new RegExp(`^-?\\d+(?:\\.\\d{0,${this.decimalCount()}})?`));

      if (match) {
        this.writedValue = parseFloat(match[0]);
      }
    }

    const currentValue = Math.round(this.writedValue * +`1${decimal}`);

    this.writedValue = parseFloat(`${currentValue}${key}`) / +`1${decimal}`;
    this.currencyValue.emit(this.writedValue);
  }

  ngOnDestroy(): void {
    const inputElement = this.elementRef.nativeElement;

    inputElement.removeEventListener('focus', this.onFocus);
    inputElement.removeEventListener('keyup', this.onKeyUp);
    inputElement.removeEventListener('keypress', this.onKeyPress);
    inputElement.removeEventListener('keydown', this.onKeyDown);
    inputElement.removeEventListener('paste', this.onPaste);
    inputElement.removeEventListener('reset', this.onReset);
  }

  ngOnInit(): void {
    this.writedValue = this.unmaskCoin(this.currentValue);

    this.input.style.textAlign = 'right';

    const inputElement = this.elementRef.nativeElement;

    inputElement.addEventListener('focus', this.onFocus);
    inputElement.addEventListener('keyup', this.onKeyUp);
    inputElement.addEventListener('keypress', this.onKeyPress);
    inputElement.addEventListener('keydown', this.onKeyDown);
    inputElement.addEventListener('paste', this.onPaste);
    inputElement.addEventListener('reset', this.onReset);
    inputElement.onchange = this.onChange;

    setTimeout(() => this.applyMask());
  }
}
