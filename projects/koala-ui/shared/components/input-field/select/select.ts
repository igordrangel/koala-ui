import {
  ApplicationRef,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Loader } from '@koalarx/ui/core/components/loader';
import { AppConfig } from '@koalarx/ui/core/config';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { assessibility } from './accessibility';
import {
  OptionsResource,
  SelectDataOptions,
  SelectDataOptionsFnParams,
  SelectList,
  SelectValue,
} from './select.type';
import { ajustOptionsContainerSize } from './utils/ajust-options-container-size';
import { generateOptionsResource } from './utils/generate-options-resource';
import { isLoadingFeedback } from './utils/is-loading-feedback';
import { onServerFilter } from './utils/on-server-filter';
import { loadOptions } from './utils/options-loader';
import { setSelectedOptionContent } from './utils/set-selected-option-content';

@Component({
  selector: 'kl-select',
  templateUrl: './select.html',
  imports: [FormsModule, ReactiveFormsModule, FieldErrors, Loader],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select extends InputFieldBase implements OnInit {
  readonly appRef = inject(ApplicationRef);
  readonly injector = inject(Injector);
  readonly selectField = viewChild<ElementRef<HTMLDivElement>>('selectField');

  readonly optionsResource = signal<OptionsResource | null>(null);
  readonly optionList = signal<SelectList>([]);
  readonly selectedOptions = signal<SelectList>([]);
  readonly isLoading = signal<boolean>(true);
  readonly requestOptionsParams = signal<SelectDataOptionsFnParams>({
    filter: null,
    currentValue: null,
    internalFilter: null,
  });
  readonly translations = inject(AppConfig).translation.form;
  readonly supportsExperimentalSelect = !CSS.supports(
    'appearance',
    'base-select',
  );
  readonly hasValue = signal<boolean>(false);

  filter = model<string>();
  filteredValue = signal<string | null>(null);

  options = input.required<SelectDataOptions>();
  internalFilter = input<string | null>(null);
  withoutFilter = input(false, { transform: booleanAttribute });
  multiple = input(false, { transform: booleanAttribute });
  selectedItem = output<any | null>();

  get selectElement() {
    const selectField = this.selectField();

    if (!selectField) {
      throw new Error('Select element not found');
    }

    return selectField.nativeElement;
  }

  constructor() {
    super();

    loadOptions(this);
    ajustOptionsContainerSize(this);
    isLoadingFeedback(this);
    assessibility(this);
  }

  ngOnInit() {
    onServerFilter(this);
    generateOptionsResource(this);
    setSelectedOptionContent(this);
  }

  applyFilter(options: SelectList) {
    const filter = this.filter() ?? '';

    return options.filter((option) =>
      option.label.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  setValue(event: Event) {
    const select = event.target as HTMLInputElement;
    const value: SelectValue = select.value;

    if (this.multiple()) {
      const selectedOptionsElements = this.selectElement.querySelectorAll(
        '.kl-select-options-content input[type="checkbox"]:checked',
      ) as NodeListOf<HTMLInputElement>;

      const values: string[] = [];

      selectedOptionsElements.forEach((option) => values.push(option.value));

      if (select.checked) {
        this.selectedOptions.update((current) => [
          ...current,
          this.optionList().find((item) => String(item.value) === value)!,
        ]);
      } else {
        this.selectedOptions.update((current) =>
          current.filter((item) => String(item.value) !== value),
        );
      }

      const selectedValues = this.selectedOptions().map((item) => item.value);

      this.control().setValue(selectedValues, { emitEvent: true });

      return;
    }

    const selectedOption = this.optionList().find(
      (item) => String(item.value) === value,
    );

    if (selectedOption) {
      this.selectedOptions.set([selectedOption]);
      this.control().setValue(selectedOption.value, { emitEvent: true });
    }

    this.selectedItem.emit(selectedOption?.data ?? null);

    document
      .querySelector<HTMLElement>(`#${this.fieldId}[popover]`)
      ?.hidePopover();
  }

  clear(event: MouseEvent) {
    event.preventDefault();
    this.selectedOptions.set([]);
    this.control().setValue(null);
  }

  removeOption(event: MouseEvent) {
    event.preventDefault();

    const target = event.target as HTMLSpanElement;
    const value = target.parentElement?.dataset['value'];

    const inputValue = this.selectElement.querySelector(
      `.kl-select-options-content input[value="${value}"]`,
    ) as HTMLInputElement;

    inputValue.click();
  }
}
