import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Loader } from '@koalarx/ui/core/components/loader';
import { AppConfig } from '@koalarx/ui/core/config';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import {
  OptionsResource,
  SelectDataOptions,
  SelectDataOptionsFnParams,
  SelectList,
  SelectValue,
} from './select.type';
import { SelectFilter } from './services/select-filter';
import { ajustFilteredValueOnSelect } from './utils/ajust-filtered-value-on-select';
import { ajustOptionsContainerSize } from './utils/ajust-options-container-size';
import { assessibility } from './utils/assessibility';
import { generateOptionsResource } from './utils/generate-options-resource';
import { loadOptions } from './utils/options-loader';
import { setValueOnElement } from './utils/set-value-on-element';

@Component({
  selector: 'kl-select',
  templateUrl: './select.html',
  imports: [FormsModule, ReactiveFormsModule, FieldErrors, Loader],
  providers: [SelectFilter],
})
export class Select extends InputFieldBase {
  readonly destroyRef = inject(DestroyRef);
  readonly selectFilter = inject(SelectFilter);
  readonly injector = inject(Injector);
  readonly selectField =
    viewChild<ElementRef<HTMLSelectElement>>('selectField');

  readonly optionsResource = signal<OptionsResource | null>(null);
  readonly optionList = signal<SelectList>([]);
  readonly isLoading = signal<boolean>(true);
  readonly requestOptionsParams = signal<SelectDataOptionsFnParams>({
    filter: null,
    autofill: null,
  });
  readonly translations = inject(AppConfig).translation.form;

  filter = model<string>();
  options = input.required<SelectDataOptions>();
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

    setValueOnElement(this);
    loadOptions(this);
    generateOptionsResource(this);
    ajustOptionsContainerSize(this);
    ajustFilteredValueOnSelect(this);
    assessibility(this);

    this.selectFilter.init(this, this.filter);
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

    this.selectElement.selectedIndex = -1;
  }
}
