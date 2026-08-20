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
import { CurrencyMask } from '@/shared/directives/currency.directive';
import { Mask } from '@/shared/directives/mask.directive';
import { Component, inject, ResourceRef, signal } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { email, form, FormField, required, validate } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { validateCnpj, validateCpf } from '@koalarx/utils/KlString';
import { InlineFilterConfig, InlineFilterField } from '../../config';
import { optionsToQueryParams } from '../../utils/options-to-query-params';

@Component({
  selector: 'app-inline-filter-mobile-picker',
  templateUrl: './mobile-picker.html',
  imports: [
    BottomSheetContainer,
    FormField,
    Fieldset,
    Input,
    Mask,
    CurrencyMask,
    Select,
    InputCalendar,
    Combobox,
    Button,
  ],
})
export class MobilePicker {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly bottomSheetRef = inject(BottomSheetRef);
  readonly config = inject<InlineFilterConfig>(BOTTOM_SHEET_DATA);

  private readonly model = signal(this.createInitialModel());

  readonly formFilter = form(this.model, (schema) => {
    for (const field of this.config.fields) {
      const path = (schema as any)[field.name];

      if (this.hasRequiredValidator(field.validators)) {
        required(path, { message: `${field.label} is required` });
      }

      if (field.inputType === 'email') {
        email(path, { message: 'Invalid email' });
      } else if (field.inputType === 'cpf') {
        validate(path, ({ value }) => {
          const current = value() as string | null | undefined;
          if (!current) {
            return undefined;
          }

          return validateCpf(String(current))
            ? undefined
            : { kind: 'cpfInvalid', message: 'CPF inválido' };
        });
      } else if (field.inputType === 'cnpj') {
        validate(path, ({ value }) => {
          const current = value() as string | null | undefined;
          if (!current) {
            return undefined;
          }

          return validateCnpj(String(current))
            ? undefined
            : { kind: 'cnpjInvalid', message: 'CNPJ inválido' };
        });
      }

      this.applyExtraValidators(path, field);
    }
  });

  private createInitialModel(): Record<string, any> {
    const queryParams = this.activatedRoute.snapshot.queryParams ?? {};

    return Object.fromEntries(
      this.config.fields.map((field) => {
        const fromField = field.value();
        const fromQuery = queryParams[field.name];
        const raw = fromField ?? fromQuery ?? field.defaultValue ?? null;

        if (raw == null || raw === '') {
          return [field.name, null];
        }

        // Only currency (and similar) should become numbers; CPF/CNPJ/select keys stay strings.
        if (typeof raw === 'string' && field.inputType === 'currency') {
          const numeric = Number(raw);
          return [field.name, Number.isNaN(numeric) ? raw : numeric];
        }

        return [field.name, raw];
      }),
    );
  }

  private applyExtraValidators(path: any, field: InlineFilterField) {
    if (!field.validators) {
      return;
    }

    const list = (Array.isArray(field.validators) ? field.validators : [field.validators]).filter(
      (validator) => validator !== Validators.required,
    );

    if (list.length === 0) {
      return;
    }

    validate(path, ({ value }) => {
      const current = value();
      const control = { value: current } as AbstractControl;

      for (const validator of list) {
        const errors = validator(control);
        if (errors) {
          const kind = Object.keys(errors)[0] ?? 'invalid';
          return { kind, message: `${field.label} is invalid` };
        }
      }

      return undefined;
    });
  }

  private hasRequiredValidator(validators?: ValidatorFn | ValidatorFn[]): boolean {
    if (!validators) {
      return false;
    }

    const list = Array.isArray(validators) ? validators : [validators];
    return list.includes(Validators.required);
  }

  fieldOf(name: string): any {
    return (this.formFilter as any)[name];
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
    if (!this.formFilter().valid()) {
      return;
    }

    const formData = { ...this.formFilter().value() } as Record<string, any>;

    this.config.fields.forEach((field) => {
      let value = formData[field.name];

      if (Array.isArray(value) && value.length === 0) {
        value = null;
      }

      field.value.set(value);
    });

    const payload = optionsToQueryParams(this.config.fields);

    this.router.navigate([], { queryParams: payload });
    this.bottomSheetRef.dismiss(payload);
  }
}
