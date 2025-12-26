import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { SelectInMemorySample } from '../../components/select-in-memory-sample/select-in-memory-sample';
import { SelectMultipleSample } from '../../components/select-multiple-sample/select-multiple-sample';
import { SelectOnDemandSample } from '../../components/select-on-demand-sample/select-on-demand-sample';
import { SelectOnServerSample } from '../../components/select-on-server-sample/select-on-server-sample';
import { SelectWithoutFilterSample } from '../../components/select-without-filter-sample/select-without-filter-sample';

@Component({
  selector: 'app-select-page',
  templateUrl: './select.page.html',
  imports: [
    CodeViewer,
    OnThisPage,
    SelectOnDemandSample,
    SelectOnServerSample,
    SelectInMemorySample,
    SelectWithoutFilterSample,
    SelectMultipleSample,
  ],
})
export class SelectPage {}
