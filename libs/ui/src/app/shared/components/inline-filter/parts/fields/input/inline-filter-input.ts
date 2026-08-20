import { CurrencyMask } from '@/shared/directives/currency.directive';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, effect, ElementRef, OnInit, viewChild } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { maskCoin } from '@koalarx/utils/KlNumber';
import { FieldBase } from '../field.base';

@Component({
  selector: 'app-inline-filter-input',
  templateUrl: './inline-filter-input.html',
  imports: [FormField, Mask, CurrencyMask],
})
export class InlineFilterInput extends FieldBase implements OnInit {
  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputField');

  constructor() {
    super();

    effect(() => {
      const config = this.config();
      const value = this.valueForm.value().value();
      const invalid = !this.valueForm.value().valid();

      if (!invalid) {
        config.templateValue.set(config.inputType === 'currency' ? maskCoin(value) : value);
      } else {
        config.templateValue.set('');
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.inputElement()?.nativeElement.focus();
    });
  }
}
