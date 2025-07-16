import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputCurrencySample } from '../../components/input-currency-sample/input-currency-sample';

@Component({
  selector: 'app-input-currency-page',
  templateUrl: './input-currency.page.html',
  imports: [CodeViewer, OnThisPage, InputCurrencySample],
})
export class InputCurrencyPage {}
