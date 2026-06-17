import { InputCalendar } from '@/shared/components/calendar';
import { Component, effect, OnInit, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KlDate } from '@koalarx/utils/light/KlDate';
import { FieldBase } from '../field.base';

@Component({
  selector: 'app-inline-filter-calendar',
  templateUrl: './inline-filter-calendar.html',
  imports: [ReactiveFormsModule, InputCalendar],
})
export class InlineFilterCalendar extends FieldBase implements OnInit {
  private readonly calendarComponentRef = viewChild<InputCalendar>('calendarField');

  constructor() {
    super();

    effect(() => {
      const config = this.config();
      const value = this.valueChanges();

      if (this.valueControl.invalid) {
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
