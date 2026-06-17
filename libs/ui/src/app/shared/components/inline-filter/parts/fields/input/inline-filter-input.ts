import { CurrencyMask } from '@/shared/directives/currency.directive';
import { Mask } from '@/shared/directives/mask.directive';
import { CnpjValidator } from '@/shared/validators/cnpj.validator';
import { CpfValidator } from '@/shared/validators/cpf.validator';
import { Component, effect, ElementRef, OnInit, viewChild } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { maskCoin } from '@koalarx/utils/KlNumber';
import { FieldBase } from '../field.base';

@Component({
  selector: 'app-inline-filter-input',
  templateUrl: './inline-filter-input.html',
  imports: [ReactiveFormsModule, Mask, CurrencyMask],
})
export class InlineFilterInput extends FieldBase implements OnInit {
  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputField');

  constructor() {
    super();

    effect(() => {
      const config = this.config();
      const value = this.valueChanges();

      if (!this.valueControl.invalid) {
        config.templateValue.set(config.inputType === 'currency' ? maskCoin(value) : value);
      } else {
        config.templateValue.set('');
      }
    });
  }

  ngOnInit(): void {
    const config = this.config();

    if (config.inputType === 'cpf') {
      this.valueControl.addValidators(CpfValidator);
    } else if (config.inputType === 'cnpj') {
      this.valueControl.addValidators(CnpjValidator);
    } else if (config.inputType === 'email') {
      this.valueControl.addValidators(Validators.email);
    }

    setTimeout(() => {
      this.inputElement()?.nativeElement.focus();
    });
  }
}
