import { InputCalendar } from '@/shared/components/calendar';
import { Component, effect, OnInit, viewChild } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { KlDate } from '@koalarx/utils/KlDate';
import { FieldBase } from '../field.base';

@Component({
  selector: 'app-inline-filter-calendar',
  templateUrl: './inline-filter-calendar.html',
  imports: [FormField, InputCalendar],
})
export class InlineFilterCalendar extends FieldBase implements OnInit {
  private readonly calendarComponentRef = viewChild<InputCalendar>('calendarField');

  constructor() {
    super();

    effect(() => {
      const config = this.config();
      const value = this.valueForm.value().value();

      if (!this.valueForm.value().valid()) {
        return;
      }

      if (value) {
        config.templateValue.set(new KlDate(`${value}T00:00:00`).format('dd/MM/yyyy'));
      } else {
        config.templateValue.set('');
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.calendarComponentRef()?.openPopover();
    });
  }
}
