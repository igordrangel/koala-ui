import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { InputTextSample } from '../../components/input-text-sample/input-text-sample';
import { InputTextWithMaskSample } from '../../components/input-text-with-mask-sample/input-text-with-mask-sample';

@Component({
  selector: 'app-input-text-page',
  templateUrl: './input-text.page.html',
  imports: [CodeViewer, OnThisPage, InputTextSample, InputTextWithMaskSample],
})
export class InputTextPage {}
