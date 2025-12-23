import {
  booleanAttribute,
  Component,
  DestroyRef,
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
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { assessibility } from './accessibility';
import {
  OptionsResource,
  SelectDataOptions,
  SelectDataOptionsFnParams,
  SelectList,
  SelectValue,
} from './select.type';
import { ajustFilteredValueOnSelect } from './utils/ajust-filtered-value-on-select';
import { ajustOptionsContainerSize } from './utils/ajust-options-container-size';
import { generateOptionsResource } from './utils/generate-options-resource';
import { onServerFilter } from './utils/on-server-filter';
import { loadOptions } from './utils/options-loader';

@Component({
  selector: 'kl-select-experimental',
  templateUrl: './select-experimental.html',
  imports: [FormsModule, ReactiveFormsModule, Loader],
})
export class SelectExperimental extends InputFieldBase implements OnInit {
  readonly destroyRef = inject(DestroyRef);
  readonly injector = inject(Injector);
  readonly selectField =
    viewChild<ElementRef<HTMLSelectElement | HTMLDivElement>>('selectField');

  readonly optionsResource = signal<OptionsResource | null>(null);
  readonly optionList = signal<SelectList>([]);
  readonly isLoading = signal<boolean>(true);
  readonly requestOptionsParams = signal<SelectDataOptionsFnParams>({
    filter: null,
    currentValue: null,
    internalFilter: null,
  });
  readonly translations = inject(AppConfig).translation.form;

  filter = model<string>();
  filteredValue = signal<string | null>(null);
  options = input.required<SelectDataOptions>();
  internalFilter = input<string | null>(null);
  withoutFilter = input(false, { transform: booleanAttribute });
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
    ajustFilteredValueOnSelect(this);
    assessibility(this);
  }

  ngOnInit() {
    onServerFilter(this);
    generateOptionsResource(this);
  }

  applyFilter(options: SelectList) {
    const filter = this.filter() ?? '';
    return options.filter((option) =>
      option.label.toLowerCase().includes(filter.toLowerCase())
    );
  }

  setValue(event: Event) {
    const select = event.target as HTMLSelectElement;
    let value: SelectValue = select.value;

    const selectedOption = this.optionList().find(
      (item) => String(item.value) === value
    );

    if (selectedOption) {
      if (typeof selectedOption.value === 'number') {
        value = Number(value);
      } else if (typeof selectedOption.value === 'boolean') {
        value = value === 'true';
      } else {
        value = selectedOption.value;
      }
      this.control().setValue(value, { emitEvent: true });
    }

    this.selectedItem.emit(selectedOption?.data ?? null);
  }

  clear(event: MouseEvent) {
    event.preventDefault();
    this.control().setValue(null);
    this.control().markAsTouched();

    if (this.selectElement instanceof HTMLSelectElement) {
      this.selectElement.selectedIndex = -1;
    }
  }
}
