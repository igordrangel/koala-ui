import { Button } from '@/shared/components/button';
import { isMobile } from '@/shared/utils/is-mobile';
import { Component, inject, Injector, input, OnInit, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { BottomSheet } from '../bottom-sheet';
import { InlineFilterConfig, InlineFilterField } from './config';
import { InputPicker } from './parts/picker/input-picker';
import { MobilePicker } from './parts/picker/mobile-picker';
import { queryParamsToOptions } from './utils/query-params-to-options';
import { optionsToQueryParams } from './utils/options-to-query-params';

interface QueryParams {
  [key: string]: any;
  page?: string;
  pageSize?: string;
}

@Component({
  selector: 'app-inline-filter',
  templateUrl: './wrapper.html',
  imports: [InputPicker, Button],
})
export class Wrapper implements OnInit {
  private readonly injector = inject(Injector);
  private readonly bottomSheet = inject(BottomSheet);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly queryParams = toSignal(this.activatedRoute.queryParams);

  protected readonly isMobile = isMobile();

  readonly config = input.required<InlineFilterConfig>();
  readonly placeholder = input('Type to filter');

  readonly qtyFieldsFiltered = signal(0);
  readonly payload = output<any>();

  ngOnInit(): void {
    if (this.isMobile) {
      let queryParams = { ...(this.queryParams() ?? {}) } as QueryParams;

      delete queryParams.page;
      delete queryParams.pageSize;

      const selectedOptions = signal<InlineFilterField[]>([]);

      queryParamsToOptions(
        this.config().fields,
        selectedOptions,
        this.queryParams() ?? {},
        this.injector,
      );

      queryParams = optionsToQueryParams(selectedOptions());

      this.qtyFieldsFiltered.set(Object.keys(queryParams).length);

      this.payload.emit(queryParams);

      queueMicrotask(() => this.router.navigate([], { queryParams }));
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
