import {
  booleanAttribute,
  Component,
  effect,
  inject,
  Injector,
  input,
  isSignal,
  OnInit,
  ResourceRef,
  runInInjectionContext,
  Signal,
  signal,
} from '@angular/core';
import { Loader } from '@koalarx/ui/core/components/loader';
import { FieldErrors } from '@koalarx/ui/shared/components/field-errors';
import { InputFieldBase } from '@koalarx/ui/shared/components/input-field';
import { HookChange } from '@koalarx/ui/shared/directives';
import { isEmpty } from '@koalarx/ui/shared/utils';
import { Autocomplete } from './autocomplete';
import {
  AutocompleteDataOptions,
  AutocompleteDataOptionsFn,
  AutocompleteList,
  AutocompleteValue,
} from './autocomplete-value';

interface OptionsResource {
  onDemand?: ResourceRef<AutocompleteList>;
  onServer?: ResourceRef<AutocompleteList>;
  inMemory?: AutocompleteList;
  inMemoryWithLoading?: Signal<AutocompleteList>;
}

@Component({
  selector: 'kl-autocomplete-field',
  templateUrl: './autocomplete-field.html',
  providers: [Autocomplete, AutocompleteValue],
  imports: [Loader, FieldErrors, HookChange],
})
export class AutocompleteField extends InputFieldBase implements OnInit {
  private readonly injector = inject(Injector);

  readonly autocompleteValue = inject(AutocompleteValue);
  readonly autocomplete = inject(Autocomplete);

  options = input.required<AutocompleteDataOptions>();
  multiple = input(false, { transform: booleanAttribute });
  placeholderSearchField = input<string>();
  disableAutoTypeConversion = input(false, { transform: booleanAttribute });

  isLoading = signal<boolean>(false);
  optionList = signal<AutocompleteList>([]);

  optionsResource = signal<OptionsResource | null>(null);

  constructor() {
    super();

    effect(() => {
      const optionList = this.optionList();
      const autofill = this.autocompleteValue.autofill();

      if (optionList.length > 0 && !isEmpty(autofill)) {
        this.autocompleteValue.makeAutofill();
      }
    });

    effect(() => {
      const options = this.optionsResource();

      if (!options) {
        return;
      }

      const { onDemand, onServer, inMemory, inMemoryWithLoading } = options;

      if (onDemand) {
        this.optionList.set(onDemand.value());
        this.isLoading.set(onDemand.isLoading());
      } else if (onServer) {
        this.optionList.set(this.applyFilter(onServer.value()));
        this.isLoading.set(onServer.isLoading());
      } else if (inMemory) {
        this.optionList.set(this.applyFilter(inMemory));
        this.isLoading.set(false);
      } else if (inMemoryWithLoading) {
        const optionsWithLoading = inMemoryWithLoading();
        this.optionList.set(this.applyFilter(optionsWithLoading ?? []));
        this.isLoading.set(!optionsWithLoading);
      }
    });
  }

  private applyFilter(options: AutocompleteList) {
    const filter = this.autocompleteValue.filter() ?? '';
    return options.filter((option) =>
      option.label.toLowerCase().includes(filter.toLowerCase())
    );
  }

  private generateOptionsResource(): OptionsResource {
    const options = this.options();

    if (Object.hasOwn(options, 'value')) {
      return { onServer: options as ResourceRef<AutocompleteList> };
    } else if (isSignal(options)) {
      return {
        inMemoryWithLoading: options as Signal<AutocompleteList>,
      };
    } else if (typeof options === 'function') {
      const resourceFnOptions = options as AutocompleteDataOptionsFn;
      return {
        onDemand: runInInjectionContext(this.injector, () =>
          resourceFnOptions(this.autocompleteValue.requestOptionsParams)
        ),
      };
    }

    return { inMemory: options as AutocompleteList };
  }

  open() {
    this.autocomplete.open({
      fieldId: this.fieldId,
      options: this.optionList,
      control: this.control(),
      multiple: this.multiple(),
      autocompleteValue: this.autocompleteValue,
      placeholderSearchField: this.placeholderSearchField(),
      disableAutoTypeConversion: this.disableAutoTypeConversion(),
    });
  }

  ngOnInit(): void {
    this.autocompleteValue.init(
      this.control(),
      this.optionList,
      this.isLoading,
      this.multiple()
    );
    this.optionsResource.set(this.generateOptionsResource());
    this.autocompleteValue.makeAutofill();
  }
}
