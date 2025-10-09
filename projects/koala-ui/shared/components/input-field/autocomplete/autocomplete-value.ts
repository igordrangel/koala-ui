import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  ResourceRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { isEmpty } from '@koalarx/ui/shared/utils';
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
  internalFilter?: string | null;
}

export type AutocompleteDataOptionsFn = (
  data: Signal<AutocompleteDataOptionsFnParams>
) => ResourceRef<AutocompleteList>;

export type AutocompleteDataOptions =
  | AutocompleteDataOptionsFn
  | ResourceRef<AutocompleteList>
  | Signal<AutocompleteList>
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
  private _isLoading?: Signal<boolean>;
  private _internalFilter = signal<string | null>(null);
  private _isOnDemand?: WritableSignal<boolean>;
  private readonly _requestOptionsParams =
    signal<AutocompleteDataOptionsFnParams>({
      filter: null,
      autofill: null,
    });

  private readonly _selectedOption = computed(() => {
    const currentValue = this._currentValue();

    if (Array.isArray(currentValue)) {
      return null;
    }

    return currentValue;
  });

  private readonly _selectedOptions = computed(() => {
    const currentValue = this._currentValue();

    if (Array.isArray(currentValue)) {
      return currentValue;
    }

    return [];
  });

  private readonly _hasValue = computed(() => {
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
    return this._hasValue;
  }

  get currentValue() {
    return this._currentValue.asReadonly();
  }

  get selectedOption() {
    return this._selectedOption;
  }

  get selectedOptions() {
    return this._selectedOptions;
  }

  get autofill() {
    return this._autofill.asReadonly();
  }

  get requestOptionsParams() {
    return this._requestOptionsParams.asReadonly();
  }

  set internalFilter(value: string | null) {
    this._internalFilter.set(value);
    this._requestOptionsParams.update(() => ({
      filter: this.filterControl.enabled ? null : this.filterControl.value,
      internalFilter: this._internalFilter(),
      autofill: null,
    }));
  }

  get isOnDemand() {
    if (!this._isOnDemand) {
      return signal(false);
    }
    return this._isOnDemand.asReadonly();
  }

  private selectedOptionIsDiff(
    options: AutocompleteOption | AutocompleteOption[]
  ) {
    if (this._multiple) {
      return (
        !Array.isArray(options) ||
        options.length !== this._selectedOptions().length ||
        options.some(
          (opt, index) => opt.value !== this._selectedOptions()[index].value
        )
      );
    }

    return (
      !options ||
      (options as AutocompleteOption).value !== this._selectedOption()?.value
    );
  }

  private async selectOption(value: any, searchIfNotFound = true) {
    if (isEmpty(value)) {
      this._currentValue.set(null);
      return;
    }

    while (this._isLoading!()) {
      await delay(100);
    }

    if (!this._options) {
      return;
    }

    const options = this._multiple
      ? this._options()?.filter((opt) => `${value}`?.includes(`${opt.value}`))
      : this._options()?.find((opt) => `${opt.value}` === `${value}`);

    if (
      !isEmpty(value) &&
      !options &&
      this._isOnDemand!() &&
      searchIfNotFound
    ) {
      this._requestOptionsParams.update(() => ({
        internalFilter: this._internalFilter(),
        autofill: value,
      }));

      await delay(100);

      await this.selectOption(value, false);

      return;
    }

    if (options && this.selectedOptionIsDiff(options)) {
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

  async makeAutofill() {
    const value = this._control?.value;

    if (isEmpty(value)) {
      return;
    }

    while (this._isLoading!()) {
      await delay(100);
    }

    await this.selectOption(value);
  }

  init(
    control: FormControl<any>,
    options: Signal<AutocompleteList>,
    isLoading: Signal<boolean>,
    isOnDemand: WritableSignal<boolean>,
    multiple = false
  ) {
    this._control = control;
    this._options = options;
    this._multiple = multiple;
    this._isLoading = isLoading;
    this._isOnDemand = isOnDemand;

    this.filterControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500))
      .subscribe((value) => {
        this._autofill.set(null);
        this._filter.set(value);
        this._requestOptionsParams.update(() => ({
          filter: value,
          internalFilter: this._internalFilter(),
          autofill: null,
        }));
      });

    this._control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.selectOption(value));
  }

  clear(event: MouseEvent) {
    event.preventDefault();
    this._control?.setValue(null);
    this._currentValue.set(null);
    this._requestOptionsParams.update(() => ({
      filter: this.filterControl.enabled ? null : this.filterControl.value,
      internalFilter: this._internalFilter(),
      autofill: null,
    }));
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
