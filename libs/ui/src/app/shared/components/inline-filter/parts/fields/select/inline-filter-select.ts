import { Select, SelectField, SelectOption } from '@/shared/components/select';
import { Component, computed, effect, OnInit, ResourceRef, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldBase } from '../field.base';

@Component({
  selector: 'app-inline-filter-select',
  templateUrl: './inline-filter-select.html',
  imports: [ReactiveFormsModule, Select],
})
export class InlineFilterSelect extends FieldBase implements OnInit {
  private readonly selectComponentRef = viewChild<SelectField>('selectField');

  readonly options = computed(() => {
    const options = this.config().options || [];
    if (Array.isArray(options)) {
      return options as SelectOption<any, any>[];
    }
    return (options as ResourceRef<SelectOption<any, any>[]>).value();
  });

  constructor() {
    super();

    effect(() => {
      const config = this.config();
      const value = this.valueChanges();
      const options = this.options();

      if (this.valueControl.invalid) {
        return;
      }

      const selectedOption = options
        .filter((option) =>
          Array.isArray(value) ? value.includes(option.value) : option.value === value,
        )
        .map((option) => option.label)
        .join(', ');

      config.templateValue.set(selectedOption);
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.selectComponentRef()?.triggerOptionsElement()?.nativeElement.focus();
      this.selectComponentRef()?.triggerOptionsElement()?.nativeElement.click();
    });
  }
}
