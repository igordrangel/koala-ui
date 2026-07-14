import { scrollIntoView } from '@/shared/utils/scroll-into-view';
import {
  booleanAttribute,
  Component,
  DestroyRef,
  effect,
  ElementRef,
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
import { FormValueControl } from '@angular/forms/signals';
import { Dropdown } from '../dropdown';
import { InputSize } from '../input-field';
import { Loading } from '../loading';
import { handleAccessibility } from './accessibility/handle-accessibility';
import { ListConfig, SelectOption, SelectOptions } from './config';
import { handleResourceOptions } from './utils/handle-resource-options';

@Component({
  selector: 'app-select',
  templateUrl: './select-field.html',
  imports: [Dropdown, Loading],
})
export class SelectField implements OnInit, FormValueControl<any> {
  private readonly destroyRef = inject(DestroyRef);

  private readonly filterOptionsElement = viewChild<ElementRef<HTMLDivElement>>('filterOptions');

  private readonly injector = inject(Injector);
  private firstLoad = true;
  private syncingFromValue = false;

  protected readonly listElementId = `select-list-${Math.random().toString(16).slice(2)}`;
  protected isDisabled = signal(false);

  readonly triggerOptionsElement = viewChild<ElementRef<HTMLButtonElement>>('triggerOptions');

  readonly value = model<any>(null);
  readonly touch = output<void>();
  readonly placeholder = input('Select an option');
  readonly inline = input(false, { transform: booleanAttribute });
  readonly options = input.required<SelectOptions<any, any>>();
  readonly size = input<InputSize>('md');
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly hideClear = input(false, { transform: booleanAttribute });

  readonly selected = output<SelectOption<any, any>[]>();
  readonly selectedOptions = signal<SelectOption<any, any>[]>([]);
  readonly selectedValues = linkedSignal<any[]>(() =>
    this.selectedOptions().map((option) => option.value),
  );
  readonly filteredOptions = signal<ResourceRef<SelectOption<any, any>[]> | null>(null);

  readonly dropdownOpened = signal(false);

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.isDisabled.set(true);
        this.selectedOptions.set([]);
      } else {
        this.isDisabled.set(false);
      }
    });

    effect(() => {
      const next = this.value();
      this.syncingFromValue = true;
      this.selectedValues.set(Array.isArray(next) ? next : next == null ? [] : [next]);
      this.syncingFromValue = false;
    });

    effect(() => {
      const selectedOptions = this.selectedOptions();
      const multiple = this.multiple();

      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }

      if (this.syncingFromValue) {
        return;
      }

      queueMicrotask(() => {
        this.selected.emit(selectedOptions);

        let nextValue: any | any[] | null = null;

        if (multiple) {
          nextValue = selectedOptions.map((option) => option.value);
        } else {
          nextValue = selectedOptions[0]?.value ?? null;
        }

        this.value.set(nextValue);
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

    effect(() => {
      const isOpened = this.dropdownOpened();
      const optionsElement = this.filterOptionsElement()!.nativeElement;

      if (isOpened) {
        const hasActiveOptions = optionsElement.querySelector('li[data-active="true"]');

        if (!hasActiveOptions) {
          const firstOption: HTMLElement | null =
            optionsElement.querySelector('li[data-selected="true"]') ??
            optionsElement.querySelector('li');

          if (firstOption) {
            firstOption.dataset['active'] = 'true';
            scrollIntoView(firstOption);
          }
        }
      }

      this.touch.emit();
    });
  }

  ngOnInit(): void {
    handleAccessibility(
      this.triggerOptionsElement()!.nativeElement,
      this.filterOptionsElement()!.nativeElement,
      this.destroyRef,
    );

    const options = this.options();
    const isArray = Array.isArray(options);

    let listConfig: ListConfig;

    if (isArray) {
      listConfig = {
        onMemory: options as SelectOption[],
        resourceRef: null!,
      };
    } else {
      listConfig = {
        onMemory: null!,
        resourceRef: options as ResourceRef<SelectOption[]>,
      };
    }

    const resourceOptions = handleResourceOptions(this.injector, listConfig);

    this.filteredOptions.set(resourceOptions);
  }

  toggleDropdown(opened: boolean) {
    if (this.isDisabled()) {
      return;
    }

    setTimeout(() => this.dropdownOpened.set(opened), 150);
  }

  toggleOption(option: SelectOption) {
    const isOpened = this.dropdownOpened();

    this.selectedOptions.update((current) => {
      const isSelected = current.some((o) => o.value === option.value);

      if (isSelected && isOpened) {
        return current.filter((o) => o.value !== option.value);
      }

      if (this.multiple()) {
        return [...current, option];
      }

      return [option];
    });
  }

  removeOption(value: string) {
    if (this.multiple()) {
      this.selectedOptions.set(this.selectedOptions().filter((option) => option.value !== value));
    } else {
      this.selectedOptions.set([]);
    }
  }
}
