import {
  BOTTOM_SHEET_DATA,
  BottomSheetContainer,
  BottomSheetRef,
} from '@/shared/components/bottom-sheet';
import { Button } from '@/shared/components/button';
import { InputCalendar } from '@/shared/components/calendar';
import { Combobox, ComboboxOptions } from '@/shared/components/combobox';
import { Fieldset } from '@/shared/components/fieldset';
import { Input } from '@/shared/components/input-field';
import { Select, SelectOption } from '@/shared/components/select';
import { ValidatorHint } from '@/shared/components/validator/validator-hint';
import { CurrencyMask } from '@/shared/directives/currency.directive';
import { Mask } from '@/shared/directives/mask.directive';
import { CnpjValidator } from '@/shared/validators/cnpj.validator';
import { CpfValidator } from '@/shared/validators/cpf.validator';
import { Component, inject, OnInit, ResourceRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InlineFilterConfig, InlineFilterField } from '../../config';
import { optionsToQueryParams } from '../../utils/options-to-query-params';

@Component({
  selector: 'app-inline-filter-mobile-picker',
  templateUrl: './mobile-picker.html',
  imports: [
    BottomSheetContainer,
    ReactiveFormsModule,
    Fieldset,
    Input,
    Mask,
    CurrencyMask,
    Select,
    InputCalendar,
    Combobox,
    ValidatorHint,
    Button,
  ],
})
export class MobilePicker implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly queryParams = toSignal(this.activatedRoute.queryParams);

  readonly bottomSheetRef = inject(BottomSheetRef);
  readonly config = inject<InlineFilterConfig>(BOTTOM_SHEET_DATA);
  readonly formFilter = inject(FormBuilder).group({});

  constructor() {
    this.config.fields.forEach((field) => {
      const control = new FormControl(field.defaultValue, field.validators);

      if (field.inputType === 'cpf') {
        control.addValidators(CpfValidator);
      } else if (field.inputType === 'cnpj') {
        control.addValidators(CnpjValidator);
      } else if (field.inputType === 'email') {
        control.addValidators(Validators.email);
      }

      this.formFilter.addControl(field.name, control);
    });
  }

  ngOnInit(): void {
    const queryParams = this.queryParams() ?? {};

    Object.keys(queryParams).forEach((key) => {
      const field = this.config.fields.find((f) => f.name === key);
      if (field) {
        const value = queryParams[key];
        this.formFilter.get(key)?.setValue(value);
      }
    });
  }

  getControl(name: string) {
    return this.formFilter.get(name) as FormControl;
  }

  getSelectOptions(field: InlineFilterField) {
    const options = field.options || [];
    if (Array.isArray(options)) {
      return options as SelectOption<any, any>[];
    }
    return options as ResourceRef<SelectOption<any, any>[]>;
  }

  getComboboxOptions(field: InlineFilterField) {
    return field.options as ComboboxOptions<any, any>;
  }

  applyFilter() {
    if (this.formFilter.valid) {
      const formData = this.formFilter.getRawValue() as any;

      this.config.fields.forEach((field) => {
        const value = formData[field.name];

        if (Array.isArray(value) && value.length === 0) {
          formData[field.name] = null;
          return;
        }

        field.value = value;
      });

      const payload = optionsToQueryParams(this.config.fields);

      this.router.navigate([], { queryParams: payload });
      this.bottomSheetRef.dismiss(payload);
    }
  }
}
