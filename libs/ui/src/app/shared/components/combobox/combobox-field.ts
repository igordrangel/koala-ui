import {
  booleanAttribute,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  linkedSignal,
  model,
  OnInit,
  output,
  ResourceRef,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Dropdown } from '../dropdown';
import { InputSize } from '../input-field';
import { Loading } from '../loading';
import { handleAccessibility } from './accessibility/handle-accessibility';
import { AsyncComboboxOptions, ComboboxOption, ComboboxOptions, ListConfig } from './config';
import { handleResourceOptions } from './utils/handle-resource-options';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox-field.html',
  imports: [ReactiveFormsModule, FormsModule, Dropdown, Loading],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxField),
      multi: true,
    },
  ],
})
export class ComboboxField implements OnInit, ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);

  private readonly triggerOptionsElement =
    viewChild<ElementRef<HTMLButtonElement>>('triggerOptions');
  private readonly filterOptionsElement = viewChild<ElementRef<HTMLDivElement>>('filterOptions');
  private readonly selectedOptionContentElement =
    viewChild<ElementRef<HTMLDivElement>>('selectedOptionContent');

  readonly inputFilterElement = viewChild<ElementRef<HTMLInputElement>>('inputFilter');

  private readonly injector = inject(Injector);
  private onChanged: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  private firstLoad = true;

  protected readonly listElementId = `combobox-list-${Math.random().toString(16).slice(2)}`;
  protected isDisabled = signal(false);

  readonly placeholder = input('Select an option');
  readonly inline = input(false, { transform: booleanAttribute });
  readonly options = input.required<ComboboxOptions<any, any>>();
  readonly size = input<InputSize>('md');
  readonly openOnType = input(false, { transform: booleanAttribute });
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly selected = output<ComboboxOption[]>();

  readonly filter = model('');
  readonly selectedOptions = signal<ComboboxOption[]>([]);
  readonly selectedValues = linkedSignal<any[]>(() =>
    this.selectedOptions().map((option) => option.value),
  );
  readonly filteredOptions = signal<ResourceRef<ComboboxOption<any, any>[]> | null>(null);

  readonly dropdownOpened = signal(false);

  constructor() {
    effect(() => {
      const triggerElement = this.triggerOptionsElement()?.nativeElement;
      const optionsElement = this.filterOptionsElement()?.nativeElement;
      const filterOptionsElement = optionsElement?.parentElement;
      const isVisible = filterOptionsElement?.matches(':popover-open') ?? false;
      const hasOptions = optionsElement?.children.length ?? 0 > 0;
      const hasFilter = !!this.filter();

      if (!triggerElement) {
        return;
      }

      if (this.openOnType()) {
        if (isVisible && (!hasFilter || !hasOptions)) {
          filterOptionsElement?.hidePopover();
          return;
        }

        if (!isVisible && hasFilter && hasOptions) {
          triggerElement.click();
        }
      }
    });

    effect(() => {
      const selectedOptions = this.selectedOptions();
      const multiple = this.multiple();

      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }

      queueMicrotask(() => {
        this.selected.emit(selectedOptions);

        let value: any | any[] | null = null;

        if (multiple) {
          value = selectedOptions.map((option) => option.value);
        } else {
          value = selectedOptions[0]?.value ?? null;
        }

        this.onChanged?.(value);
      });
    });

    effect(() => {
      const selectedValues = this.selectedValues();
      const selectedOptions = this.selectedOptions();
      const optionsResource = this.filteredOptions();

      if (!selectedValues.some((option) => !selectedOptions.map((o) => o.value).includes(option))) {
        return;
      }

      if (!optionsResource || this.firstLoad) {
        return;
      }

      const options = optionsResource.value();

      if (!optionsResource.isLoading() && !optionsResource.error() && options.length > 0) {
        this.selectedOptions.set(options.filter((option) => selectedValues.includes(option.value)));
      }
    });
  }

  ngOnInit(): void {
    handleAccessibility(
      this.inputFilterElement()!.nativeElement,
      this.filterOptionsElement()!.nativeElement,
      this.selectedOptionContentElement()!.nativeElement,
      () => {
        const alreadyVisible = this.dropdownOpened();

        if (alreadyVisible) {
          return true;
        }

        this.toggleDropdown();

        return false;
      },
      () => {
        if (this.multiple()) {
          this.removeOption(this.selectedValues()[this.selectedValues().length - 1]);
        }
      },
      this.filter,
      this.destroyRef,
    );

    const options = this.options();
    const isArray = Array.isArray(options);
    const isResourceRef = typeof options === 'object' && options !== null && 'value' in options;
    const isAsync = typeof options === 'function';

    let listConfig: ListConfig | undefined;

    if (isArray) {
      listConfig = {
        onMemory: options as ComboboxOption[],
        resourceRef: null!,
        async: null!,
      };
    } else if (isResourceRef) {
      listConfig = {
        onMemory: null!,
        resourceRef: options as ResourceRef<ComboboxOption[]>,
        async: null!,
      };
    } else if (isAsync) {
      listConfig = {
        onMemory: null!,
        resourceRef: null!,
        async: options as AsyncComboboxOptions,
      };
    }

    const resourceOptions = handleResourceOptions(
      this.injector,
      this.filter,
      this.selectedValues,
      listConfig,
    );

    this.filteredOptions.set(resourceOptions);
  }

  writeValue(value: any | any[]): void {
    this.selectedValues.set(Array.isArray(value) ? value : [value]);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  toggleDropdown() {
    if (this.isDisabled()) {
      return;
    }

    if (!this.openOnType()) {
      this.triggerOptionsElement()?.nativeElement.click();
      this.onTouched();
    }
  }

  toggleOption(option: ComboboxOption) {
    this.selectedOptions.update((current) => {
      const isSelected = current.some((o) => o.value === option.value);

      if (isSelected) {
        return current.filter((o) => o.value !== option.value);
      }

      if (this.multiple()) {
        return [...current, option];
      }
      return [option];
    });

    this.filter.set('');
  }

  removeOption(value: string) {
    if (this.multiple()) {
      this.selectedOptions.set(this.selectedOptions().filter((option) => option.value !== value));
    } else {
      this.selectedOptions.set([]);
      this.filter.set('');
    }
  }
}
