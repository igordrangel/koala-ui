import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { ButtonLoaderSample } from '../../components/botton-loader/button-loader-sample';
import { ButtonColorSample } from '../../components/button-color/button-color-sample';
import { ButtonFormatSample } from '../../components/button-format/button-format-sample';
import { ButtonSizeSample } from '../../components/button-size/button-size-sample';
import { ButtonSoftSample } from '../../components/button-soft/button-soft-sample';

@Component({
  selector: 'app-button-page',
  templateUrl: './button.page.html',
  imports: [
    CodeViewer,
    OnThisPage,
    ButtonColorSample,
    ButtonSoftSample,
    ButtonSizeSample,
    ButtonFormatSample,
    ButtonLoaderSample,
  ],
})
export class ButtonPage {}
