import {
  booleanAttribute,
  Component,
  effect,
  inject,
  Injector,
  input,
  isSignal,
  linkedSignal,
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
import {
  OptionsResource,
  SelectDataOptions,
  SelectDataOptionsFn,
  SelectList,
} from '../select';
import { SelectMultipleElementControl } from './select-multiple-element-control';
import { SelectMultipleValue } from './select-multiple-value';

@Component({
  selector: 'kl-select-multiple',
  templateUrl: './select-multiple.html',
  providers: [SelectMultipleElementControl, SelectMultipleValue],
  imports: [Loader, FieldErrors, HookChange],
})
export class SelectMultiple extends InputFieldBase implements OnInit {
  private readonly injector = inject(Injector);

  readonly selectMultipleValue = inject(SelectMultipleValue);
  readonly select = inject(SelectMultipleElementControl);

  readonly options = input.required<SelectDataOptions>();
  readonly placeholderSearchField = input<string>();
  readonly disableAutoTypeConversion = input(false, {
    transform: booleanAttribute,
  });

  readonly isLoading = signal<boolean>(true);
  readonly optionList = signal<SelectList>([]);

  readonly optionsResource = signal<OptionsResource | null>(null);
  readonly isOnDemand = linkedSignal(
    () => this.optionsResource()?.onDemand !== undefined
  );

  constructor() {
    super();

    effect(() => {
      const optionList = this.optionList();
      const autofill = this.selectMultipleValue.autofill();

      if (optionList.length > 0 && !isEmpty(autofill)) {
        this.selectMultipleValue.makeAutofill();
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

  private applyFilter(options: SelectList) {
    const filter = this.selectMultipleValue.filter() ?? '';
    return options.filter((option) =>
      option.label.toLowerCase().includes(filter.toLowerCase())
    );
  }

  private generateOptionsResource(): OptionsResource {
    const options = this.options();

    if (Object.hasOwn(options, 'value')) {
      return { onServer: options as ResourceRef<SelectList> };
    } else if (isSignal(options)) {
      return {
        inMemoryWithLoading: options as Signal<SelectList>,
      };
    } else if (typeof options === 'function') {
      const resourceFnOptions = options as SelectDataOptionsFn;
      return {
        onDemand: runInInjectionContext(this.injector, () =>
          resourceFnOptions(this.selectMultipleValue.requestOptionsParams)
        ),
      };
    }

    return { inMemory: options as SelectList };
  }

  open() {
    this.select.open({
      fieldId: this.fieldId,
      options: this.optionList,
      control: this.control(),
      selectMultipleValue: this.selectMultipleValue,
      placeholderSearchField: this.placeholderSearchField(),
      disableAutoTypeConversion: this.disableAutoTypeConversion(),
    });
  }

  ngOnInit(): void {
    this.selectMultipleValue.init(
      this.control(),
      this.optionList,
      this.isLoading,
      this.isOnDemand
    );
    this.optionsResource.set(this.generateOptionsResource());
    this.selectMultipleValue.makeAutofill();
  }
}
