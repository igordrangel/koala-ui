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
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

export type AutocompleteOptionValue = string | number | boolean | null;

export interface AutocompleteOption<TData = any> {
  label: string;
  value: AutocompleteOptionValue;
  data?: TData;
}

export type AutocompleteList = AutocompleteOption[];

export type AutocompleteDataOptionsFn = (
  filter: Signal<string | null>
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

  private selectOption(value: any) {
    if (!this._options) {
      return;
    }

    const option = this._options().find((opt) => opt.value === value);

    if (option) {
      this._currentValue.update((current) => {
        if (this._multiple) {
          if (Array.isArray(current)) {
            return [...current, option];
          }

          return [option];
        }

        return option;
      });
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
      .subscribe((value) => this._filter.set(value));

    this._control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.selectOption(value));
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this._control?.setValue(null);
    this._currentValue.set(null);
  }
}
