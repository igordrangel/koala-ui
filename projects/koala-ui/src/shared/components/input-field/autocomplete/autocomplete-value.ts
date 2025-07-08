import {
  DestroyRef,
  inject,
  Injectable,
  linkedSignal,
  ResourceRef,
  signal,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { isEmpty } from '@koalarx/ui/shared/utils/is-empty';
import { delay } from '@koalarx/utils/KlDelay';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

export type AutocompleteOptionValue = string | number | null;

export interface AutocompleteOption<TData = any> {
  label: string;
  value: AutocompleteOptionValue;
  data?: TData;
}

export type AutocompleteList = AutocompleteOption[];
export interface AutocompleteDataOptionsFnParams {
  filter?: string | null;
  autofill?: any | null;
}

export type AutocompleteDataOptionsFn = (
  data: Signal<AutocompleteDataOptionsFnParams>
) => ResourceRef<AutocompleteList>;

export type AutocompleteDataOptions =
  | AutocompleteDataOptionsFn
  | ResourceRef<AutocompleteList>
  | AutocompleteList;

@Injectable()
export class AutocompleteValue {
  private readonly destroyRef = inject(DestroyRef);
  private readonly _filter = signal<string | null>('');
  private _control?: FormControl<any>;
  private readonly _currentValue = signal<
    AutocompleteOption | AutocompleteOption[] | null
  >(null);
  private _multiple = false;
  private _options?: Signal<AutocompleteList>;
  private _autofill = signal<any | null>(null);
  private readonly _requestOptionsParams =
    linkedSignal<AutocompleteDataOptionsFnParams>(() => ({
      filter: this._filter(),
      autofill: this._autofill(),
    }));

  private readonly _selectedOption = linkedSignal(() => {
    const currentValue = this._currentValue();

    if (Array.isArray(currentValue)) {
      return null;
    }

    return currentValue;
  });

  private readonly _selectedOptions = linkedSignal(() => {
    const currentValue = this._currentValue();

    if (Array.isArray(currentValue)) {
      return currentValue;
    }

    return [];
  });

  private readonly _hasValue = linkedSignal(() => {
    const currentValue = this._currentValue();
    const value = Array.isArray(currentValue)
      ? currentValue
      : currentValue?.value;

    if (Array.isArray(value)) {
      return value.length > 0;
    } else if (typeof value === 'number') {
      return value >= 0;
    }

    return !!value;
  });

  filterControl = new FormControl<string | null>('');

  get filter() {
    return this._filter.asReadonly();
  }

  get hasValue() {
    return this._hasValue.asReadonly();
  }

  get currentValue() {
    return this._currentValue.asReadonly();
  }

  get selectedOption() {
    return this._selectedOption.asReadonly();
  }

  get selectedOptions() {
    return this._selectedOptions.asReadonly();
  }

  get autofill() {
    return this._autofill.asReadonly();
  }

  get requestOptionsParams() {
    return this._requestOptionsParams.asReadonly();
  }

  private selectOption(value: any) {
    if (!this._options) {
      return;
    }

    const options = this._multiple
      ? this._options().filter((opt) => value?.includes(opt.value))
      : this._options().find((opt) => opt.value === value);

    if (options) {
      this._currentValue.update(() => {
        if (this._multiple) {
          if (Array.isArray(options)) {
            return options;
          }

          return [options];
        }

        return options;
      });
    }
  }

  async makeAutofill(loadingState: Signal<boolean>) {
    while (loadingState()) {
      await delay(100);
    }

    this.selectOption(this._control?.value);

    const currentValue = this._currentValue();

    if (
      (this._multiple &&
        ((Array.isArray(currentValue) && currentValue.length === 0) ||
          !Array.isArray(currentValue))) ||
      (!this._multiple && isEmpty(currentValue))
    ) {
      this._autofill.set(this._control?.value);
    }
  }

  init(
    control: FormControl<any>,
    options: Signal<AutocompleteList>,
    multiple = false
  ) {
    this._control = control;
    this._options = options;
    this._multiple = multiple;

    this.filterControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500))
      .subscribe((value) => {
        this._autofill.set(null);
        this._filter.set(value);
      });

    this._control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.selectOption(value));
  }

  clear(event: MouseEvent) {
    event.preventDefault();
    this._control?.setValue(null);
    this._currentValue.set(null);
  }

  remove(event: MouseEvent, value: AutocompleteOptionValue) {
    event.preventDefault();
    if (!this._multiple) {
      return;
    }

    if (!this._control) {
      return;
    }

    const currentValue = this._control.value;

    this._control?.setValue(
      currentValue.filter((v: AutocompleteOptionValue) => v !== value)
    );
  }
}
