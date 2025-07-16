import {
  Directive,
  ElementRef,
  inject,
  input,
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
export class InputCurrencyMask implements OnInit {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(
    ElementRef<HTMLInputElement>
  );
  private writedValue = 0.0;

  decimalCount = input<number>(2);
  currencyValue = output<number>();

  private maskCoin(value: number) {
    let prefix = '$';
    const thousandSeparator = ',';
    const decimalSeparator = '.';

    switch (AppConfig.language) {
      case 'en':
        prefix = '$';
        break;
      case 'ptBr':
        prefix = 'R$';
        break;
    }

    return new KlNumber(value).maskCoin(
      prefix,
      thousandSeparator,
      decimalSeparator,
      this.decimalCount()
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

  private onFocus() {
    this.elementRef.nativeElement.addEventListener('focus', () => {
      this.putInputCaretOnTheEnd();
    });
  }

  private onKeyUp() {
    this.elementRef.nativeElement.addEventListener('keyup', (event) => {
      if (/\d/.test(event.key) || event.key === 'Backspace') {
        this.updateWritedValue(event.key, event.key === 'Backspace');

        if (isNaN(this.writedValue)) {
          this.writedValue = 0;
        }

        this.applyMask();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        this.putInputCaretOnTheEnd();
      }
    });
  }

  private onKeyPress() {
    this.elementRef.nativeElement.addEventListener('keypress', (event) => {
      event.preventDefault();
    });
  }

  private onKeyDown() {
    this.elementRef.nativeElement.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault();
      }
    });
  }

  private onPaste() {
    this.elementRef.nativeElement.addEventListener('paste', (event) => {
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
    });
  }

  private onReset() {
    this.elementRef.nativeElement.addEventListener('reset', () => {
      this.writedValue = 0.0;
      this.applyMask();
    });
  }

  private putInputCaretOnTheEnd() {
    setTimeout(() =>
      this.input.setSelectionRange(
        this.currentValue.length,
        this.currentValue.length
      )
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

  ngOnInit(): void {
    this.writedValue = this.unmaskCoin(this.currentValue);

    this.input.style.textAlign = 'right';

    this.onFocus();
    this.onKeyUp();
    this.onKeyPress();
    this.onKeyDown();
    this.onPaste();
    this.onReset();

    setTimeout(() => this.applyMask());
  }
}
