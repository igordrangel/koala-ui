import {
  booleanAttribute,
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  OnInit,
  ResourceRef,
  signal,
} from '@angular/core';
import { Loader } from '@koalarx/ui/core/components/loader/loader';
import { InputFieldBase } from '../input-field.base';
import { Autocomplete } from './autocomplete';
import {
  AutocompleteDataOptions,
  AutocompleteList,
  AutocompleteValue,
} from './autocomplete-value';

@Component({
  selector: 'kl-autocomplete-field',
  templateUrl: './autocomplete-field.html',
  providers: [Autocomplete, AutocompleteValue],
  imports: [Loader],
})
export class AutocompleteField extends InputFieldBase implements OnInit {
  readonly autocompleteValue = inject(AutocompleteValue);
  readonly autocomplete = inject(Autocomplete);

  options = input.required<AutocompleteDataOptions>();
  multiple = input(false, { transform: booleanAttribute });
  placeholderSearchField = input<string>();

  isLoading = linkedSignal(() => {
    let options = this.options();

    if (Object.hasOwn(options, 'value')) {
      options = options as ResourceRef<AutocompleteList>;
      return options.isLoading();
    } else if (typeof options === 'function') {
      return options(this.autocompleteValue.filter).isLoading();
    }

    return false;
  });

  optionList = signal<AutocompleteList>([]);

  constructor() {
    super();

    effect(() => {
      let options = this.options();

      if (Object.hasOwn(options, 'value')) {
        options = this.options() as ResourceRef<AutocompleteList>;

        this.optionList.set(this.applyFilter(options.value()));

        return;
      } else if (typeof options === 'function') {
        this.optionList.set(options(this.autocompleteValue.filter).value());

        return;
      }

      this.optionList.set(this.applyFilter(options as AutocompleteList));
    });
  }

  private applyFilter(options: AutocompleteList) {
    const filter = this.autocompleteValue.filter() ?? '';
    return options.filter((option) =>
      option.label.toLowerCase().includes(filter.toLowerCase())
    );
  }

  open() {
    this.autocomplete.open({
      fieldId: this.fieldId,
      options: this.optionList,
      control: this.control(),
      multiple: this.multiple(),
      autocompleteValue: this.autocompleteValue,
      placeholderSearchField: this.placeholderSearchField(),
    });
  }

  ngOnInit(): void {
    this.autocompleteValue.init(
      this.control(),
      this.optionList,
      this.multiple()
    );
  }
}
