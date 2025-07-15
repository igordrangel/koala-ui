import { Component } from '@angular/core';
import { CodeViewer } from '@koalarx/ui/shared/components/code-viewer';
import { OnThisPage } from '@koalarx/ui/shared/components/on-this-page';
import { DropdownSample } from '../../components/dropdown/dropdown-sample';

@Component({
  selector: 'app-dropdown-page',
  templateUrl: './dropdown.page.html',
  imports: [CodeViewer, OnThisPage, DropdownSample],
})
export class DropdownPage {}
