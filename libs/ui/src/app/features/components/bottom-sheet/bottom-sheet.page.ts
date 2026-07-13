import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import { BottomSheet, BottomSheetConfig } from '@/shared/components/bottom-sheet';
import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component, inject } from '@angular/core';
import { BottomSheetSample } from './bottom-sheet-sample';

@Component({
  selector: 'app-bottom-sheet-page',
  templateUrl: './bottom-sheet.page.html',
  imports: [Section, Button, Tabs],
})
export class BottomSheetPage {
  private readonly docs = useDocsCopy('bottom-sheet');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;

  private readonly bottomSheet = inject(BottomSheet);

  open(closeOptions: BottomSheetConfig['closeOptions'], closeButtonCorner = false) {
    this.bottomSheet.open(BottomSheetSample, { closeOptions, data: { closeButtonCorner } });
  }
}
