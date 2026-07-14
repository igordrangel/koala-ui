import { Dropdown } from '@/shared/components/dropdown';
import { Tooltip } from '@/shared/components/tooltip';
import { Combobox } from '@angular/aria/combobox';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { InlineFilterField } from '../../config';
import { optionsToQueryParams } from '../../utils/options-to-query-params';
import { queryParamsToOptions } from '../../utils/query-params-to-options';
import { InputFilterChip } from '../chip/input-filter-chip';
import { InputFilterEdit } from '../edit/input-filter-edit';
import { handleAccessibility } from './accessibility/handle-accessibility';
import { KeyboardShortcuts } from './keyboard-shortcuts';

@Component({
  selector: 'app-input-picker',
  templateUrl: './input-picker.html',
  imports: [
    Dropdown,
    Combobox,
    InputFilterEdit,
    InputFilterChip,
    Tooltip,
    KeyboardShortcuts,
  ],
})
export class InputPicker implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly injector = inject(Injector);

  private readonly queryParams = toSignal(this.activatedRoute.queryParams, {
    initialValue: this.activatedRoute.snapshot.queryParams,
  });

  private readonly inputFilterElement = viewChild<ElementRef<HTMLInputElement>>('inputFilter');
  private readonly triggerOptionsElement =
    viewChild<ElementRef<HTMLButtonElement>>('triggerOptions');
  private readonly filterOptionsElement = viewChild<ElementRef<HTMLDivElement>>('filterOptions');

  protected readonly filter = signal('');
  protected readonly selectedOptions = signal<InlineFilterField[]>([]);

  readonly inlineFilterElementId = `inline-filter-${Math.random().toString(16).slice(2)}`;

  readonly filterOptions = input.required<InlineFilterField[]>();
  readonly placeholder = input('Type to filter');

  readonly optionsVisible = signal(false);

  readonly filteredOptions = computed(() => {
    const filterOptions = this.filterOptions().filter(
      (option) => !this.selectedOptions().some((selected) => selected.name === option.name),
    );

    const filterValue = this.filter().toLowerCase();

    if (!filterValue) {
      return filterOptions;
    }

    return filterOptions.filter((option) => option.label.toLowerCase().includes(filterValue));
  });

  readonly payload = output<Record<string, any>>();

  private hadActiveFilters = false;
  private suppressAutoFocus = true;

  constructor() {
    effect(() => {
      const triggerElement = this.triggerOptionsElement()?.nativeElement;
      const filterOptionsElement = this.filterOptionsElement()?.nativeElement?.parentElement;
      const isVisible = this.optionsVisible();
      const filteredOptions = this.filteredOptions();
      const hasFilter = !!this.filter();
      const inEditionMode = this.selectedOptions().some((option) => option.editing);

      if (!triggerElement) {
        return;
      }

      if (isVisible && filteredOptions.length === 0) {
        filterOptionsElement?.hidePopover();
        return;
      }

      if (!inEditionMode && !isVisible && hasFilter && filteredOptions.length > 0) {
        this.toggleOptions();
      }
    });

    effect(() => {
      const selectedOptions = this.selectedOptions();
      const payload = optionsToQueryParams(selectedOptions);
      const inEditionMode = selectedOptions.some((option) => option.editing);

      this.router.navigate([], { queryParams: payload });

      if (!inEditionMode && (selectedOptions.length > 0 || this.hadActiveFilters)) {
        if (selectedOptions.length > 0 && !this.suppressAutoFocus) {
          setTimeout(() => this.inputFilterElement()?.nativeElement.focus());
        }
        this.payload.emit(payload);
      }

      this.hadActiveFilters = selectedOptions.length > 0;
    });
  }

  ngOnInit() {
    handleAccessibility(
      this.inputFilterElement()!.nativeElement,
      this.filterOptionsElement()!.nativeElement,
      () => {
        const alreadyVisible = this.optionsVisible();

        if (alreadyVisible) {
          return true;
        }

        this.toggleOptions();

        return false;
      },
      () => this.editLastOption(),
      () => this.removeLastOption(),
      this.filter,
      this.destroyRef,
    );

    const queryParams = this.queryParams() ?? {};
    queryParamsToOptions(this.filterOptions(), this.selectedOptions, queryParams, this.injector);
    this.suppressAutoFocus = false;
  }

  toggleOptions() {
    this.optionsVisible.update((visible) => {
      if (!visible) {
        this.triggerOptionsElement()?.nativeElement.click();
        return true;
      }

      return visible;
    });
  }

  chooseOption(option: InlineFilterField) {
    option.editing = true;

    this.selectedOptions.update((options) => {
      const newOptions = [...options];
      const index = options.findIndex((o) => o.name === option.name);

      if (index !== -1) {
        newOptions.splice(index, 1);
      }

      option.templateValue.set('');
      option.value.set(null);

      newOptions.push(option);

      return newOptions;
    });
  }

  edit(field: InlineFilterField) {
    this.selectedOptions.update((options) => {
      return options.map((o) => {
        o.editing = false;

        if (o.name === field.name) {
          o.editing = true;
        }

        return o;
      });
    });
  }

  editLastOption() {
    this.filter.set('');

    const hasEditing = this.selectedOptions().some((item) => item.editing);

    if (!hasEditing && !this.filter()) {
      this.selectedOptions.update((current) => {
        const lastIndex = current.length - 1;

        if (lastIndex >= 0) {
          current[lastIndex].editing = true;
        }

        return [...current];
      });
    }
  }

  removeLastOption() {
    this.filter.set('');
    this.selectedOptions.update((options) => options.slice(0, -1));
  }

  exitEditMode(field: InlineFilterField) {
    this.filter.set('');
    this.selectedOptions.update((options) =>
      options.map((o) => {
        if (o === field) {
          return { ...o, editing: false };
        }

        return o;
      }),
    );
  }

  removeOption(option: InlineFilterField) {
    this.filter.set('');
    this.selectedOptions.update((options) => options.filter((o) => o !== option));
  }
}
