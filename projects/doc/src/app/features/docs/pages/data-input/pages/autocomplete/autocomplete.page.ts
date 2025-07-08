import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page/on-this-page';
import { AutocompleteInMemorySample } from '../../components/autocomplete-in-memory-sample/autocomplete-in-memory-sample';
import { AutocompleteOnDemandSample } from '../../components/autocomplete-on-demand-sample/autocomplete-on-demand-sample';
import { AutocompleteOnServerSample } from '../../components/autocomplete-on-server-sample/autocomplete-on-server-sample';

@Component({
  selector: 'app-autocomplete-page',
  templateUrl: './autocomplete.page.html',
  imports: [
    CodeViewer,
    OnThisPage,
    AutocompleteOnDemandSample,
    AutocompleteOnServerSample,
    AutocompleteInMemorySample,
  ],
})
export class AutocompletePage {}
