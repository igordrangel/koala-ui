import { Button } from '@/shared/components/button';
import { isMobile } from '@/shared/utils/is-mobile';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BottomSheet } from '../bottom-sheet';
import { InlineFilterConfig } from './config';
import { InputPicker } from './parts/picker/input-picker';
import { MobilePicker } from './parts/picker/mobile-picker';

@Component({
  selector: 'app-inline-filter',
  templateUrl: './wrapper.html',
  imports: [InputPicker, Button],
})
export class Wrapper implements OnInit {
  private readonly bottomSheet = inject(BottomSheet);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly queryParams = toSignal(this.activatedRoute.queryParams);

  protected readonly isMobile = isMobile();

  readonly config = input.required<InlineFilterConfig>();
  readonly placeholder = input('Type to filter');

  readonly qtyFieldsFiltered = signal(0);
  readonly payload = output<any>();

  ngOnInit(): void {
    if (this.isMobile) {
      const queryParams = this.queryParams() ?? {};
      this.qtyFieldsFiltered.set(Object.keys(queryParams).length);
      this.payload.emit(queryParams);
    }
  }

  openMobilePicker() {
    this.bottomSheet.open(MobilePicker, {
      data: this.config(),
      closeOptions: {
        trigger: {},
      },
      afterClosed: (payload) => {
        this.qtyFieldsFiltered.set(Object.keys(payload).length);
        this.payload.emit(payload);
      },
    });
  }
}
