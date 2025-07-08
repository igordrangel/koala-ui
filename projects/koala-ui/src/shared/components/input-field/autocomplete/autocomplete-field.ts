import {
  booleanAttribute,
  Component,
  effect,
  inject,
  input,
  isSignal,
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
  AutocompleteDataOptionsFn,
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
    if (isSignal(this.options)) {
      const options = this.options() as ResourceRef<AutocompleteList>;
      return options.isLoading();
    }

    return false;
  });

  optionList = signal<AutocompleteList>([]);

  constructor() {
    super();

    effect(() => {
      if (Object.hasOwn(this.options(), 'value')) {
        const options: ResourceRef<AutocompleteList> = this.options() as any;

        this.optionList.set(this.applyFilter(options.value()));

        return;
      } else if (typeof this.options() === 'function') {
        const options: AutocompleteDataOptionsFn = this.options() as any;

        this.optionList.set(options(this.autocompleteValue.filter).value());

        return;
      }

      this.optionList.set(this.applyFilter(this.options() as AutocompleteList));
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
