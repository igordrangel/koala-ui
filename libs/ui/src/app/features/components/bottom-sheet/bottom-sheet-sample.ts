import {
  BOTTOM_SHEET_CONFIG,
  BOTTOM_SHEET_DATA,
  BottomSheetConfig,
  BottomSheetContainer,
  BottomSheetRef,
} from '@/shared/components/bottom-sheet';
import { Button } from '@/shared/components/button';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet-sample',
  templateUrl: './bottom-sheet-sample.html',
  imports: [BottomSheetContainer, Button],
})
export class BottomSheetSample {
  private readonly data = inject<any>(BOTTOM_SHEET_DATA);

  readonly bottomSheetRef = inject(BottomSheetRef);
  readonly bottomSheetOptions = inject<BottomSheetConfig>(BOTTOM_SHEET_CONFIG);
  readonly closeButtonCorner = this.data?.closeButtonCorner || false;
}
