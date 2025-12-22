import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { isEmpty } from '@koalarx/ui/shared/utils';
import { delay } from '@koalarx/utils/KlDelay';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import {
  SelectDataOptionsFnParams,
  SelectList,
  SelectOption,
  SelectValue,
} from '../select';

@Injectable()
export class SelectMultipleValue {
  private readonly destroyRef = inject(DestroyRef);
  private readonly _filter = signal<string | null>('');
  private _control?: FormControl<any>;
  private readonly _currentValue = signal<SelectOption[] | null>(null);
  private _options?: Signal<SelectList>;
  private _autofill = signal<any | null>(null);
  private _isLoading?: Signal<boolean>;
  private _internalFilter = signal<string | null>(null);
  private _isOnDemand?: WritableSignal<boolean>;
  private readonly _requestOptionsParams = signal<SelectDataOptionsFnParams>({
    filter: null,
    currentValue: null,
  });

  private readonly _hasValue = computed(() => {
    const currentValue = this._currentValue() ?? [];

    return currentValue.length > 0;
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
      currentValue: null,
    }));
  }

  get isOnDemand() {
    if (!this._isOnDemand) {
      return signal(false);
    }
    return this._isOnDemand.asReadonly();
  }

  private selectedOptionIsDiff(options: SelectOption[]) {
    const selectedOptions = this._currentValue() ?? [];

    return (
      !Array.isArray(options) ||
      options.length !== selectedOptions.length ||
      options.some((opt, index) => opt.value !== selectedOptions[index].value)
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

    const options = this._options()?.filter((opt) =>
      `${value}`?.includes(`${opt.value}`)
    );

    if (
      !isEmpty(value) &&
      !options &&
      this._isOnDemand!() &&
      searchIfNotFound
    ) {
      this._requestOptionsParams.update(() => ({
        internalFilter: this._internalFilter(),
        currentValue: value,
      }));

      await delay(100);

      await this.selectOption(value, false);

      return;
    }

    if (options && this.selectedOptionIsDiff(options)) {
      this._currentValue.set(options);
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
    options: Signal<SelectList>,
    isLoading: Signal<boolean>,
    isOnDemand: WritableSignal<boolean>
  ) {
    this._control = control;
    this._options = options;
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
          currentValue: null,
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
      currentValue: null,
    }));
  }

  remove(event: MouseEvent, value: SelectValue) {
    event.preventDefault();

    if (!this._control) {
      return;
    }

    const currentValue = this._control.value;

    this._control?.setValue(
      currentValue.filter((v: SelectValue) => v !== value)
    );
  }
}
